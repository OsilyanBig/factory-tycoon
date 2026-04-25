import { create } from 'zustand';
import {
  GameState, MachineType, PlacedMachine, Direction,
  GridCell, ConveyorPlaceMode, ResourceType, Recipe,
  ConveyorItem,
} from '@/types';
import { MACHINES, isConveyor } from '@/data/machines';
import { RECIPES } from '@/data/recipes';
import { QUESTS } from '@/data/quests';
import { RESOURCES, TERRAINS } from '@/data/resources';
import { generateMap } from '@/utils/mapGenerator';

const GRID_WIDTH = 100;
const GRID_HEIGHT = 100;

function createId(): string {
  return Math.random().toString(36).substring(2, 11);
}

interface GameActions {
  // Makine
  placeMachine: (x: number, y: number, type: MachineType, direction: Direction) => boolean;
  removeMachine: (x: number, y: number) => void;
  rotateMachine: (x: number, y: number) => void;
  setMachineRecipe: (x: number, y: number, recipe: Recipe) => void;

  // Konveyör
  placeConveyorLine: (path: { x: number; y: number; direction: Direction }[]) => void;

  // UI
  setSelectedTool: (tool: MachineType | 'select' | 'delete') => void;
  setConveyorPlaceMode: (mode: ConveyorPlaceMode) => void;
  setSelectedMachine: (machine: PlacedMachine | null) => void;
  setCamera: (x: number, y: number, zoom: number) => void;
  setGameSpeed: (speed: number) => void;

  // Oyun
  tick: (deltaTime: number) => void;
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;
  completeQuest: (questId: string) => void;
  checkQuests: () => void;
  saveGame: () => void;
  loadGame: () => boolean;
  resetGame: () => void;
  startNewGame: () => void;
}

function createInitialState(): GameState {
  const grid = generateMap(GRID_WIDTH, GRID_HEIGHT, 42);

  // Başlangıçta açık makineler
  const unlockedMachines: MachineType[] = [
    'miner_mk1', 'conveyor', 'smelter', 'small_storage', 'trash',
  ];

  // Başlangıçta açık reçeteler
  const unlockedRecipes: string[] = [
    'iron_ingot', 'copper_ingot', 'carbon', 'iron_nail',
  ];

  // Başlangıçta açık kaynaklar
  const unlockedResources: ResourceType[] = [
    'iron_ore', 'copper_ore', 'coal',
    'iron_ingot', 'copper_ingot', 'carbon', 'iron_nail',
  ];

  // Görevleri kopyala
  const quests = QUESTS.map(q => ({ ...q, objectives: q.objectives.map(o => ({ ...o })) }));

  return {
    money: 500,
    currentChapter: 1,
    totalPlayTime: 0,
    gameSpeed: 1,
    gridWidth: GRID_WIDTH,
    gridHeight: GRID_HEIGHT,
    grid,
    camera: {
      x: GRID_WIDTH / 2,
      y: GRID_HEIGHT / 2,
      zoom: 1,
    },
    energyProduction: 0,
    energyConsumption: 0,
    energyStored: 100,
    energyCapacity: 100,
    totalProduced: {},
    totalSold: {},
    selectedTool: 'select',
    selectedMachine: null,
    conveyorPlaceMode: 'line',
    quests,
    unlockedMachines,
    unlockedRecipes,
    unlockedResources,
    stats: {
      machinesPlaced: 0,
      conveyorsPlaced: 0,
      itemsProduced: 0,
      totalMoneyEarned: 0,
    },
  };
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...createInitialState(),

  // ═══════════════════════════════
  // MAKİNE YERLEŞTİRME
  // ═══════════════════════════════
  placeMachine: (x: number, y: number, type: MachineType, direction: Direction): boolean => {
    const state = get();
    const def = MACHINES[type];
    if (!def) return false;

    // Para kontrolü
    if (state.money < def.price) return false;

    // Sınır kontrolü
    if (x < 0 || y < 0 || x + def.size.w > state.gridWidth || y + def.size.h > state.gridHeight) return false;

    // Alan kontrolü
    for (let dy = 0; dy < def.size.h; dy++) {
      for (let dx = 0; dx < def.size.w; dx++) {
        const cell = state.grid[y + dy]?.[x + dx];
        if (!cell) return false;
        if (cell.machine) return false;
        if (cell.terrain === 'rock' || cell.terrain === 'water_terrain') return false;
      }
    }

    // Madenci kaynak kontrolü
    if (def.category === 'extraction') {
      const cell = state.grid[y][x];
      const terrain = TERRAINS[cell.terrain];
      if (!terrain?.resourceType) return false;

      // Su pompası sadece su kaynağında
      if (type === 'water_pump' && cell.terrain !== 'water_deposit') return false;
      if (type === 'oil_pump' && cell.terrain !== 'oil_deposit') return false;
      if ((type === 'miner_mk1' || type === 'miner_mk2' || type === 'miner_mk3')
        && (cell.terrain === 'water_deposit' || cell.terrain === 'oil_deposit')) return false;
    }

    // Yönü konveyörler için ayarla
    let actualDirection = direction;
    if (isConveyor(type)) {
      actualDirection = direction;
    }

    // Reçete ata (madenci için otomatik)
    let recipe: Recipe | null = null;
    if (def.category === 'extraction') {
      const cell = state.grid[y][x];
      const terrain = TERRAINS[cell.terrain];
      if (terrain?.resourceType) {
        // Madenci için sanal reçete oluştur
        recipe = {
          id: `mine_${terrain.resourceType}`,
          inputs: [],
          outputs: [{ type: terrain.resourceType, amount: 1 }],
          craftTime: 2 / def.speed,
          machine: type,
          unlockedAtChapter: 1,
        };
      }
    }

    const machine: PlacedMachine = {
      id: createId(),
      type,
      x, y,
      direction: actualDirection,
      recipe,
      inputBuffer: [],
      outputBuffer: [],
      progress: 0,
      isWorking: false,
      fuelBuffer: 0,
    };

    set(state => {
      const newGrid = state.grid.map(row => row.map(cell => ({ ...cell })));
      for (let dy = 0; dy < def.size.h; dy++) {
        for (let dx = 0; dx < def.size.w; dx++) {
          newGrid[y + dy][x + dx] = {
            ...newGrid[y + dy][x + dx],
            machine: { ...machine },
          };
        }
      }

      const isConv = isConveyor(type);
      return {
        grid: newGrid,
        money: state.money - def.price,
        stats: {
          ...state.stats,
          machinesPlaced: state.stats.machinesPlaced + (isConv ? 0 : 1),
          conveyorsPlaced: state.stats.conveyorsPlaced + (isConv ? 1 : 0),
        },
      };
    });

    get().checkQuests();
    return true;
  },

  // ═══════════════════════════════
  // MAKİNE KALDIRMA
  // ═══════════════════════════════
  removeMachine: (x: number, y: number) => {
    set(state => {
      const cell = state.grid[y]?.[x];
      if (!cell?.machine) return state;

      const def = MACHINES[cell.machine.type];
      const refund = Math.floor(def.price * 0.5);

      const newGrid = state.grid.map(row => row.map(c => ({ ...c })));
      const mX = cell.machine.x;
      const mY = cell.machine.y;

      for (let dy = 0; dy < def.size.h; dy++) {
        for (let dx = 0; dx < def.size.w; dx++) {
          if (newGrid[mY + dy]?.[mX + dx]) {
            newGrid[mY + dy][mX + dx] = {
              ...newGrid[mY + dy][mX + dx],
              machine: null,
              conveyorItems: [],
            };
          }
        }
      }

      return { grid: newGrid, money: state.money + refund };
    });
  },

  // ═══════════════════════════════
  // MAKİNE DÖNDÜRME
  // ═══════════════════════════════
  rotateMachine: (x: number, y: number) => {
    const dirs: Direction[] = ['up', 'right', 'down', 'left'];
    set(state => {
      const cell = state.grid[y]?.[x];
      if (!cell?.machine) return state;

      const currentIdx = dirs.indexOf(cell.machine.direction);
      const newDir = dirs[(currentIdx + 1) % 4];

      const newGrid = state.grid.map(row => row.map(c => ({ ...c })));
      newGrid[y][x] = {
        ...newGrid[y][x],
        machine: { ...cell.machine, direction: newDir },
      };

      return { grid: newGrid };
    });
  },

  // ═══════════════════════════════
  // REÇETE AYARLAMA
  // ═══════════════════════════════
  setMachineRecipe: (x: number, y: number, recipe: Recipe) => {
    set(state => {
      const cell = state.grid[y]?.[x];
      if (!cell?.machine) return state;

      const newGrid = state.grid.map(row => row.map(c => ({ ...c })));
      newGrid[y][x] = {
        ...newGrid[y][x],
        machine: {
          ...cell.machine,
          recipe,
          inputBuffer: [],
          outputBuffer: [],
          progress: 0,
          isWorking: false,
        },
      };

      return { grid: newGrid };
    });
  },

  // ═══════════════════════════════
  // KONVEYÖR ÇİZGİ YERLEŞTİRME
  // ═══════════════════════════════
  placeConveyorLine: (path) => {
    const state = get();
    path.forEach(p => {
      get().placeMachine(p.x, p.y, state.selectedTool as MachineType, p.direction);
    });
  },

  // ═══════════════════════════════
  // UI
  // ═══════════════════════════════
  setSelectedTool: (tool) => set({ selectedTool: tool, selectedMachine: null }),
  setConveyorPlaceMode: (mode) => set({ conveyorPlaceMode: mode }),
  setSelectedMachine: (machine) => set({ selectedMachine: machine }),
  setCamera: (x, y, zoom) => set({ camera: { x, y, zoom: Math.max(0.3, Math.min(3, zoom)) } }),
  setGameSpeed: (speed) => set({ gameSpeed: speed }),

  // ═══════════════════════════════
  // PARA
  // ═══════════════════════════════
  addMoney: (amount) => set(state => ({
    money: state.money + amount,
    stats: { ...state.stats, totalMoneyEarned: state.stats.totalMoneyEarned + amount },
  })),

  spendMoney: (amount) => {
    const state = get();
    if (state.money < amount) return false;
    set({ money: state.money - amount });
    return true;
  },

  // ═══════════════════════════════
  // OYUN DÖNGÜSÜ (TICK)
  // ═══════════════════════════════
  tick: (deltaTime: number) => {
    set(state => {
      const dt = deltaTime * state.gameSpeed;
      const newGrid = state.grid.map(row => row.map(cell => ({
        ...cell,
        machine: cell.machine ? { ...cell.machine } : null,
        conveyorItems: [...cell.conveyorItems],
      })));

      let energyProd = 0;
      let energyCons = 0;
      let newMoney = state.money;
      const newTotalProduced = { ...state.totalProduced };
      let itemsProduced = state.stats.itemsProduced;

      // Her hücreyi işle
      for (let y = 0; y < state.gridHeight; y++) {
        for (let x = 0; x < state.gridWidth; x++) {
          const cell = newGrid[y][x];
          const machine = cell.machine;
          if (!machine) continue;

          // Aynı makinenin birden fazla hücresinde olabiliriz (2x2 makineler)
          // Sadece sol üst köşede işle
          if (machine.x !== x || machine.y !== y) continue;

          const def = MACHINES[machine.type];
          if (!def) continue;

          // Enerji hesapla
          if (def.energyConsumption < 0) {
            // Enerji üreticisi
            if (def.fuelType) {
              // Yakıtlı jeneratör
              if (machine.fuelBuffer > 0) {
                machine.fuelBuffer -= (def.fuelPerSecond || 0.5) * dt;
                energyProd += Math.abs(def.energyConsumption);
                machine.isWorking = true;
              } else {
                machine.isWorking = false;
                // Yakıt al input buffer'dan
                const fuelInBuffer = machine.inputBuffer.find(s => s.type === def.fuelType);
                if (fuelInBuffer && fuelInBuffer.amount > 0) {
                  fuelInBuffer.amount -= 1;
                  machine.fuelBuffer = 10; // 10 saniyelik yakıt
                }
              }
            } else {
              // Güneş paneli gibi yakıtsız
              energyProd += Math.abs(def.energyConsumption);
              machine.isWorking = true;
            }
          } else {
            energyCons += def.energyConsumption;
          }

          // Satış terminali
          if (machine.type === 'sell_terminal') {
            for (const stack of machine.inputBuffer) {
              if (stack.amount > 0) {
                const res = RESOURCES[stack.type];
                if (res && res.sellPrice > 0) {
                  newMoney += res.sellPrice * stack.amount;
                  stack.amount = 0;
                }
              }
            }
            continue;
          }

          // Çöp kutusu
          if (machine.type === 'trash') {
            machine.inputBuffer = [];
            continue;
          }

          // Depo - girdileri depola
          if (def.category === 'storage' && def.storageCapacity) {
            // Depo mantığı: girdi alır, depolar
            const totalStored = machine.inputBuffer.reduce((sum, s) => sum + s.amount, 0);
            if (totalStored >= def.storageCapacity) {
              // Dolu
            }
            continue;
          }

          // Üretim yapan makineler
          if (machine.recipe) {
            const recipe = machine.recipe;
            const speed = def.speed;

            if (machine.isWorking) {
              // Üretim devam ediyor
              machine.progress += (dt / recipe.craftTime) * speed;

              if (machine.progress >= 1) {
                machine.progress = 0;
                machine.isWorking = false;

                // Çıktı üret
                for (const output of recipe.outputs) {
                  const existing = machine.outputBuffer.find(s => s.type === output.type);
                  if (existing) {
                    existing.amount += output.amount;
                  } else {
                    machine.outputBuffer.push({ type: output.type, amount: output.amount });
                  }

                  // İstatistik
                  newTotalProduced[output.type] = (newTotalProduced[output.type] || 0) + output.amount;
                  itemsProduced += output.amount;
                }
              }
            } else {
              // Çıktı buffer dolu mu? (max 10)
              const totalOutput = machine.outputBuffer.reduce((sum, s) => sum + s.amount, 0);
              if (totalOutput >= 10) continue;

              // Enerji yeterli mi?
              if (def.energyConsumption > 0 && state.energyStored <= 0) continue;

              // Madenci (input yok)
              if (def.category === 'extraction') {
                machine.isWorking = true;
                machine.progress = 0;
                continue;
              }

              // Girdi kontrolü
              let hasAllInputs = true;
              for (const input of recipe.inputs) {
                const inBuffer = machine.inputBuffer.find(s => s.type === input.type);
                if (!inBuffer || inBuffer.amount < input.amount) {
                  hasAllInputs = false;
                  break;
                }
              }

              if (hasAllInputs) {
                // Girdileri tüket
                for (const input of recipe.inputs) {
                  const inBuffer = machine.inputBuffer.find(s => s.type === input.type)!;
                  inBuffer.amount -= input.amount;
                }
                machine.isWorking = true;
                machine.progress = 0;
              }
            }
          }
        }
      }

      // KONVEYÖR TAŞIMA
      // Çıktısı olan makinelerden konveyörlere aktar
      for (let y = 0; y < state.gridHeight; y++) {
        for (let x = 0; x < state.gridWidth; x++) {
          const cell = newGrid[y][x];
          const machine = cell.machine;
          if (!machine) continue;
          if (machine.x !== x || machine.y !== y) continue;

          const def = MACHINES[machine.type];
          if (!def) continue;

          // Çıktısı var mı?
          if (machine.outputBuffer.length === 0) continue;
          const totalOutput = machine.outputBuffer.reduce((sum, s) => sum + s.amount, 0);
          if (totalOutput <= 0) continue;

          // Çıkış yönündeki hücreyi bul
          const outputDir = machine.direction;
          const nextPos = getNextPos(x, y, outputDir);

          if (nextPos.x < 0 || nextPos.y < 0 ||
            nextPos.x >= state.gridWidth || nextPos.y >= state.gridHeight) continue;

          const nextCell = newGrid[nextPos.y][nextPos.x];

          // Konveyöre aktar
          if (nextCell.machine && isConveyor(nextCell.machine.type)) {
            if (nextCell.conveyorItems.length < 2) {
              // İlk dolu stack'den bir tane al
              for (const stack of machine.outputBuffer) {
                if (stack.amount > 0) {
                  const item: ConveyorItem = {
                    id: createId(),
                    type: stack.type,
                    progress: 0,
                    fromX: x, fromY: y,
                    toX: nextPos.x, toY: nextPos.y,
                  };
                  nextCell.conveyorItems.push(item);
                  stack.amount -= 1;
                  break;
                }
              }
            }
          }
          // Başka makineye doğrudan aktar
          else if (nextCell.machine && !isConveyor(nextCell.machine.type)) {
            const nextMachine = nextCell.machine;
            const nextDef = MACHINES[nextMachine.type];
            if (nextDef) {
              const totalInput = nextMachine.inputBuffer.reduce((sum, s) => sum + s.amount, 0);
              if (totalInput < 20) {
                for (const stack of machine.outputBuffer) {
                  if (stack.amount > 0) {
                    const existing = nextMachine.inputBuffer.find(s => s.type === stack.type);
                    if (existing) {
                      existing.amount += 1;
                    } else {
                      nextMachine.inputBuffer.push({ type: stack.type, amount: 1 });
                    }
                    stack.amount -= 1;
                    break;
                  }
                }
              }
            }
          }

          // Boş stacks temizle
          machine.outputBuffer = machine.outputBuffer.filter(s => s.amount > 0);
        }
      }

      // Konveyör item hareketi
      for (let y = 0; y < state.gridHeight; y++) {
        for (let x = 0; x < state.gridWidth; x++) {
          const cell = newGrid[y][x];
          if (!cell.machine || !isConveyor(cell.machine.type)) continue;

          const convDef = MACHINES[cell.machine.type];
          const speed = (convDef?.speed || 1) * 1.5;

          for (const item of cell.conveyorItems) {
            item.progress += dt * speed;
          }

          // Hedefe ulaşanları aktar
          const arrived = cell.conveyorItems.filter(item => item.progress >= 1);
          const remaining = cell.conveyorItems.filter(item => item.progress < 1);

          for (const item of arrived) {
            const nextPos = getNextPos(x, y, cell.machine.direction);
            if (nextPos.x < 0 || nextPos.y < 0 ||
              nextPos.x >= state.gridWidth || nextPos.y >= state.gridHeight) {
              remaining.push({ ...item, progress: 1 }); // Sıkışır
              continue;
            }

            const nextCell = newGrid[nextPos.y][nextPos.x];

            if (nextCell.machine && isConveyor(nextCell.machine.type)) {
              // Sonraki konveyöre aktar
              if (nextCell.conveyorItems.length < 2) {
                nextCell.conveyorItems.push({
                  ...item,
                  progress: 0,
                  fromX: x, fromY: y,
                  toX: nextPos.x, toY: nextPos.y,
                });
              } else {
                remaining.push({ ...item, progress: 1 });
              }
            } else if (nextCell.machine) {
              // Makineye aktar
              const nextMachine = nextCell.machine;
              const totalInput = nextMachine.inputBuffer.reduce((sum, s) => sum + s.amount, 0);
              if (totalInput < 20) {
                const existing = nextMachine.inputBuffer.find(s => s.type === item.type);
                if (existing) {
                  existing.amount += 1;
                } else {
                  nextMachine.inputBuffer.push({ type: item.type, amount: 1 });
                }
              } else {
                remaining.push({ ...item, progress: 1 });
              }
            } else {
              remaining.push({ ...item, progress: 1 });
            }
          }

          cell.conveyorItems = remaining;
        }
      }

      // Enerji güncelle
      const netEnergy = energyProd - energyCons;
      let newEnergyStored = state.energyStored + netEnergy * dt;
      newEnergyStored = Math.max(0, Math.min(state.energyCapacity, newEnergyStored));

      return {
        grid: newGrid,
        money: newMoney,
        energyProduction: energyProd,
        energyConsumption: energyCons,
        energyStored: newEnergyStored,
        totalProduced: newTotalProduced,
        totalPlayTime: state.totalPlayTime + dt,
        stats: {
          ...state.stats,
          itemsProduced,
        },
      };
    });

    // Görev kontrolü
    get().checkQuests();
  },

  // ═══════════════════════════════
  // GÖREV SİSTEMİ
  // ═══════════════════════════════
  completeQuest: (questId: string) => {
    set(state => {
      const newQuests = state.quests.map(q => {
        if (q.id === questId) {
          return { ...q, isCompleted: true, isActive: false };
        }
        return { ...q };
      });

      const quest = state.quests.find(q => q.id === questId);
      let newMoney = state.money;
      let newUnlockedMachines = [...state.unlockedMachines];
      let newUnlockedRecipes = [...state.unlockedRecipes];
      let newChapter = state.currentChapter;

      if (quest) {
        newMoney += quest.rewards.money;

        if (quest.rewards.unlocks) {
          for (const unlock of quest.rewards.unlocks) {
            if (MACHINES[unlock] && !newUnlockedMachines.includes(unlock as MachineType)) {
              newUnlockedMachines.push(unlock as MachineType);
            }
          }
        }
      }

      // Sonraki görevi aç
      const questIndex = newQuests.findIndex(q => q.id === questId);
      if (questIndex >= 0 && questIndex < newQuests.length - 1) {
        const nextQuest = newQuests[questIndex + 1];
        nextQuest.isUnlocked = true;
        nextQuest.isActive = true;

        // Bölüm değişikliği
        if (nextQuest.chapter > newChapter) {
          newChapter = nextQuest.chapter;
          // Yeni bölüm reçeteleri aç
          RECIPES.forEach(r => {
            if (r.unlockedAtChapter <= newChapter && !newUnlockedRecipes.includes(r.id)) {
              newUnlockedRecipes.push(r.id);
            }
          });
          // Yeni bölüm makineleri aç
          Object.values(MACHINES).forEach(m => {
            if (m.unlockedAtChapter <= newChapter && !newUnlockedMachines.includes(m.type)) {
              newUnlockedMachines.push(m.type);
            }
          });
        }
      }

      return {
        quests: newQuests,
        money: newMoney,
        unlockedMachines: newUnlockedMachines,
        unlockedRecipes: newUnlockedRecipes,
        currentChapter: newChapter,
      };
    });
  },

  checkQuests: () => {
    const state = get();
    const activeQuests = state.quests.filter(q => q.isActive && !q.isCompleted);

    for (const quest of activeQuests) {
      let allComplete = true;

      for (const obj of quest.objectives) {
        switch (obj.type) {
          case 'produce':
            obj.current = state.totalProduced[obj.target] || 0;
            break;
          case 'place': {
            let count = 0;
            for (let y = 0; y < state.gridHeight; y++) {
              for (let x = 0; x < state.gridWidth; x++) {
                if (state.grid[y][x]?.machine?.type === obj.target) {
                  count++;
                }
              }
            }
            obj.current = count;
            break;
          }
          case 'earn':
            obj.current = state.stats.totalMoneyEarned;
            break;
          case 'sell':
            obj.current = Object.values(state.totalSold).reduce((a, b) => a + b, 0);
            break;
          case 'have':
            obj.current = state.totalProduced[obj.target] || 0;
            break;
        }

        if (obj.current < obj.amount) {
          allComplete = false;
        }
      }

      if (allComplete) {
        get().completeQuest(quest.id);
      }
    }
  },

  // ═══════════════════════════════
  // KAYIT SİSTEMİ
  // ═══════════════════════════════
  saveGame: () => {
    const state = get();
    const saveData = {
      money: state.money,
      currentChapter: state.currentChapter,
      totalPlayTime: state.totalPlayTime,
      gameSpeed: state.gameSpeed,
      grid: state.grid,
      camera: state.camera,
      energyStored: state.energyStored,
      energyCapacity: state.energyCapacity,
      totalProduced: state.totalProduced,
      totalSold: state.totalSold,
      quests: state.quests,
      unlockedMachines: state.unlockedMachines,
      unlockedRecipes: state.unlockedRecipes,
      unlockedResources: state.unlockedResources,
      stats: state.stats,
    };
    try {
      localStorage.setItem('factoryTycoonSave', JSON.stringify(saveData));
    } catch (e) {
      console.error('Save failed:', e);
    }
  },

  loadGame: (): boolean => {
    try {
      const data = localStorage.getItem('factoryTycoonSave');
      if (!data) return false;
      const saveData = JSON.parse(data);
      set({
        ...saveData,
        selectedTool: 'select',
        selectedMachine: null,
        conveyorPlaceMode: 'line',
        gridWidth: GRID_WIDTH,
        gridHeight: GRID_HEIGHT,
        energyProduction: 0,
        energyConsumption: 0,
      });
      return true;
    } catch (e) {
      console.error('Load failed:', e);
      return false;
    }
  },

  resetGame: () => set(createInitialState()),
  startNewGame: () => set(createInitialState()),
}));

// Yardımcı fonksiyon
function getNextPos(x: number, y: number, direction: Direction): { x: number; y: number } {
  switch (direction) {
    case 'up': return { x, y: y - 1 };
    case 'down': return { x, y: y + 1 };
    case 'left': return { x: x - 1, y };
    case 'right': return { x: x + 1, y };
  }
}
