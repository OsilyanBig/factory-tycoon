import { create } from 'zustand';
import { GameState, Machine, Direction, MachineType, GridCell, Position, ResourceType, ResourceStack, Recipe } from '@/types';
import { MACHINE_DEFINITIONS, isConveyor, isMiner, isProcessing, isStorage, isGenerator } from '@/data/machines';
import { TERRAIN_RESOURCE_MAP, RESOURCE_DEFINITIONS } from '@/data/resources';
import { RECIPES, getRecipesForMachine } from '@/data/recipes';
import { generateMap } from '@/data/mapGenerator';

let machineIdCounter = 0;
function genId() { return `m_${++machineIdCounter}_${Date.now()}`; }

function conveyorItemId() { return `ci_${++machineIdCounter}_${Date.now()}`; }

const GRID_W = 60;
const GRID_H = 60;
const TICK_RATE = 1 / 60; // 60fps simülasyon

const initialGrid = generateMap(GRID_W, GRID_H, 1);

// Yön vektörleri
const DIR_VECTORS: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE_DIR: Record<Direction, Direction> = {
  up: 'down', down: 'up', left: 'right', right: 'left',
};

interface GameStore extends GameState {
  // Aksiyonlar
  placeMachine: (x: number, y: number, type: MachineType, dir: Direction) => boolean;
  removeMachine: (x: number, y: number) => void;
  setSelectedTool: (tool: MachineType | 'delete' | 'select' | null) => void;
  setPlacementDirection: (dir: Direction) => void;
  rotateDirection: () => void;
  selectMachine: (id: string | null) => void;
  setRecipeForMachine: (machineId: string, recipeId: string) => void;
  setCamera: (x: number, y: number) => void;
  setZoom: (z: number) => void;
  setGameSpeed: (speed: number) => void;
  togglePause: () => void;
  tick: (dt: number) => void;
  saveGame: () => void;
  loadGame: () => boolean;
  resetGame: () => void;
  dismissDialog: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // İlk durum
  money: 500,
  chapter: 1,
  totalEnergy: 100,
  energyProduction: 50,
  energyConsumption: 0,
  gameSpeed: 1,
  isPaused: false,
  tickCount: 0,

  gridWidth: GRID_W,
  gridHeight: GRID_H,
  grid: initialGrid,
  machines: {},

  unlockedMachines: ['miner_mk1', 'conveyor', 'smelter', 'small_storage', 'trash'],
  unlockedRecipes: ['iron_ingot', 'copper_ingot', 'carbon', 'iron_nail'],
  unlockedAreas: 0,

  quests: [],
  activeDialog: [
    "Mayday, mayday! Kargo gemisi Atlas-7 kontrol kaybetti!",
    "...",
    "Ugh... Neredeyim? Gemi paramparça...",
    "Önce temel malzeme toplamalıyım. Şu demir yatağına bir madenci kursam iyi olur.",
    "Araç çubuğundan ⛏ Madenci seç ve demir yatağının üzerine yerleştir!"
  ],
  dialogIndex: 0,

  selectedTool: null,
  selectedMachineId: null,
  placementDirection: 'right',

  cameraX: GRID_W / 2,
  cameraY: GRID_H / 2,
  zoom: 1,

  stats: {
    totalProduced: {},
    totalPlayTime: 0,
    machinesPlaced: 0,
  },

  // ===== AKSİYONLAR =====

  placeMachine: (x, y, type, dir) => {
    const state = get();
    const def = MACHINE_DEFINITIONS[type];
    if (!def) return false;

    // Para kontrolü
    if (state.money < def.price) return false;

    // Sınır kontrolü
    if (x < 0 || y < 0 || x >= state.gridWidth || y >= state.gridHeight) return false;

    // Hücre dolu mu
    if (state.grid[y][x].machineId) return false;

    // Terrain kontrolü (madenciler)
    if (def.canPlaceOn && def.canPlaceOn.length > 0) {
      if (!def.canPlaceOn.includes(state.grid[y][x].terrain)) return false;
    }

    // Kaya veya su üzerine konamaz
    if (state.grid[y][x].terrain === 'rock' || state.grid[y][x].terrain === 'water_terrain') return false;

    const id = genId();
    const machine: Machine = {
      id,
      type,
      position: { x, y },
      direction: dir,
      recipe: null,
      inputBuffer: [],
      outputBuffer: [],
      craftProgress: 0,
      isWorking: false,
      conveyorItems: [],
    };

    // Madenciler otomatik kaynak üretir (reçete gerek yok)
    // İşleme makineleri için ilk uygun reçeteyi otomatik seç
    if (isProcessing(type)) {
      const recipes = getRecipesForMachine(type).filter(r =>
        state.unlockedRecipes.includes(r.id)
      );
      if (recipes.length > 0) {
        machine.recipe = recipes[0];
      }
    }

    const newGrid = state.grid.map(row => row.map(cell => ({ ...cell })));
    newGrid[y][x].machineId = id;

    set({
      grid: newGrid,
      machines: { ...state.machines, [id]: machine },
      money: state.money - def.price,
      energyConsumption: state.energyConsumption + def.energyConsumption,
      energyProduction: state.energyProduction + def.energyProduction,
      stats: {
        ...state.stats,
        machinesPlaced: state.stats.machinesPlaced + 1,
      },
    });

    return true;
  },

  removeMachine: (x, y) => {
    const state = get();
    if (x < 0 || y < 0 || x >= state.gridWidth || y >= state.gridHeight) return;

    const cell = state.grid[y][x];
    if (!cell.machineId) return;

    const machine = state.machines[cell.machineId];
    if (!machine) return;

    const def = MACHINE_DEFINITIONS[machine.type];
    const refund = Math.floor(def.price * 0.5);

    const newGrid = state.grid.map(row => row.map(c => ({ ...c })));
    newGrid[y][x].machineId = null;

    const newMachines = { ...state.machines };
    delete newMachines[cell.machineId];

    set({
      grid: newGrid,
      machines: newMachines,
      money: state.money + refund,
      energyConsumption: state.energyConsumption - def.energyConsumption,
      energyProduction: state.energyProduction - def.energyProduction,
      selectedMachineId: state.selectedMachineId === cell.machineId ? null : state.selectedMachineId,
    });
  },

  setSelectedTool: (tool) => set({ selectedTool: tool, selectedMachineId: null }),
  setPlacementDirection: (dir) => set({ placementDirection: dir }),
  rotateDirection: () => {
    const dirs: Direction[] = ['right', 'down', 'left', 'up'];
    const state = get();
    const idx = dirs.indexOf(state.placementDirection);
    set({ placementDirection: dirs[(idx + 1) % 4] });
  },
  selectMachine: (id) => set({ selectedMachineId: id, selectedTool: 'select' }),

  setRecipeForMachine: (machineId, recipeId) => {
    const state = get();
    const machine = state.machines[machineId];
    if (!machine) return;

    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    const newMachines = {
      ...state.machines,
      [machineId]: {
        ...machine,
        recipe,
        craftProgress: 0,
        inputBuffer: [],
        outputBuffer: [],
      }
    };
    set({ machines: newMachines });
  },

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
  setZoom: (z) => set({ zoom: Math.max(0.3, Math.min(3, z)) }),
  setGameSpeed: (speed) => set({ gameSpeed: speed }),
  togglePause: () => set(s => ({ isPaused: !s.isPaused })),

  dismissDialog: () => {
    const state = get();
    if (!state.activeDialog) return;
    if (state.dialogIndex < state.activeDialog.length - 1) {
      set({ dialogIndex: state.dialogIndex + 1 });
    } else {
      set({ activeDialog: null, dialogIndex: 0 });
    }
  },

  // ===== OYUN DÖNGÜSÜ =====
  tick: (dt) => {
    const state = get();
    if (state.isPaused) return;

    const scaledDt = dt * state.gameSpeed;
    const newMachines = { ...state.machines };
    let moneyChange = 0;
    const produced: Record<string, number> = {};

    // Enerji yeterli mi?
    const hasEnergy = state.energyProduction >= state.energyConsumption;

    Object.values(newMachines).forEach(machine => {
      const def = MACHINE_DEFINITIONS[machine.type];
      if (!def) return;

      // Enerji yoksa çalışma
      if (def.energyConsumption > 0 && !hasEnergy) {
        machine.isWorking = false;
        return;
      }

      // === MADENCİLER ===
      if (isMiner(machine.type)) {
        const terrain = state.grid[machine.position.y]?.[machine.position.x]?.terrain;
        const resourceType = TERRAIN_RESOURCE_MAP[terrain as keyof typeof TERRAIN_RESOURCE_MAP];
        if (!resourceType) return;

        const mineSpeed = 1 * def.speed;
        machine.craftProgress += scaledDt * mineSpeed;
        machine.isWorking = true;

        if (machine.craftProgress >= 2) { // Her 2 saniyede 1 kaynak
          machine.craftProgress = 0;

          // Çıkış yönündeki hücreye gönder
          const outDir = DIR_VECTORS[machine.direction];
          const targetX = machine.position.x + outDir.x;
          const targetY = machine.position.y + outDir.y;

          if (targetX >= 0 && targetX < state.gridWidth && targetY >= 0 && targetY < state.gridHeight) {
            const targetCellId = state.grid[targetY]?.[targetX]?.machineId;
            if (targetCellId && newMachines[targetCellId]) {
              const target = newMachines[targetCellId];

              if (isConveyor(target.type)) {
                if (target.conveyorItems.length < 3) {
                  target.conveyorItems.push({
                    id: conveyorItemId(),
                    type: resourceType,
                    progress: 0,
                  });
                  produced[resourceType] = (produced[resourceType] || 0) + 1;
                }
              } else if (isProcessing(target.type) || isStorage(target.type) || target.type === 'sell_terminal') {
                const existing = target.inputBuffer.find(s => s.type === resourceType);
                const totalInput = target.inputBuffer.reduce((s, i) => s + i.amount, 0);
                if (totalInput < 20) {
                  if (existing) existing.amount += 1;
                  else target.inputBuffer.push({ type: resourceType, amount: 1 });
                  produced[resourceType] = (produced[resourceType] || 0) + 1;
                }
              }
            }
          }
          // Çıkış yok veya dolu - output buffer'a koy
          else {
            const existing = machine.outputBuffer.find(s => s.type === resourceType);
            if (existing && existing.amount < 10) existing.amount += 1;
            else if (!existing) machine.outputBuffer.push({ type: resourceType, amount: 1 });
          }
        }
      }

      // === KONVEYÖRLER ===
      if (isConveyor(machine.type)) {
        const speed = def.speed * 0.8; // items/saniye hız

        // Itemları ilerlet
        machine.conveyorItems.forEach(item => {
          item.progress += scaledDt * speed;
        });

        // Progress >= 1 olan itemları sonraki makineye aktar
        const done = machine.conveyorItems.filter(i => i.progress >= 1);
        const remaining = machine.conveyorItems.filter(i => i.progress < 1);

        done.forEach(item => {
          const outDir = DIR_VECTORS[machine.direction];
          const tx = machine.position.x + outDir.x;
          const ty = machine.position.y + outDir.y;

          let transferred = false;

          if (tx >= 0 && tx < state.gridWidth && ty >= 0 && ty < state.gridHeight) {
            const targetId = state.grid[ty]?.[tx]?.machineId;
            if (targetId && newMachines[targetId]) {
              const target = newMachines[targetId];

              if (isConveyor(target.type)) {
                if (target.conveyorItems.length < 3) {
                  target.conveyorItems.push({ ...item, progress: 0 });
                  transferred = true;
                }
              } else if (isProcessing(target.type)) {
                const totalInput = target.inputBuffer.reduce((s, i) => s + i.amount, 0);
                if (totalInput < 20) {
                  const existing = target.inputBuffer.find(s => s.type === item.type);
                  if (existing) existing.amount += 1;
                  else target.inputBuffer.push({ type: item.type, amount: 1 });
                  transferred = true;
                }
              } else if (isStorage(target.type)) {
                const cap = def.storageCapacity || MACHINE_DEFINITIONS[target.type]?.storageCapacity || 50;
                const total = target.inputBuffer.reduce((s, i) => s + i.amount, 0);
                if (target.type === 'trash') {
                  transferred = true; // çöpe at
                } else if (total < cap) {
                  const existing = target.inputBuffer.find(s => s.type === item.type);
                  if (existing) existing.amount += 1;
                  else target.inputBuffer.push({ type: item.type, amount: 1 });
                  transferred = true;
                }
              } else if (target.type === 'sell_terminal') {
                const resDef = RESOURCE_DEFINITIONS[item.type];
                if (resDef && resDef.sellPrice > 0) {
                  moneyChange += resDef.sellPrice;
                  transferred = true;
                }
              } else if (isGenerator(target.type)) {
                // Jeneratöre yakıt ver
                const existing = target.inputBuffer.find(s => s.type === item.type);
                const total = target.inputBuffer.reduce((s, i) => s + i.amount, 0);
                if (total < 10) {
                  if (existing) existing.amount += 1;
                  else target.inputBuffer.push({ type: item.type, amount: 1 });
                  transferred = true;
                }
              }
            }
          }

          if (!transferred) {
            // Geri koy (bekle)
            remaining.push({ ...item, progress: 0.99 });
          }
        });

        machine.conveyorItems = remaining;
      }

      // === İŞLEME MAKİNELERİ ===
      if (isProcessing(machine.type) && machine.recipe) {
        const recipe = machine.recipe;

        // Girdiler yeterli mi kontrol et
        const hasInputs = recipe.inputs.every(inp => {
          const buf = machine.inputBuffer.find(b => b.type === inp.type);
          return buf && buf.amount >= inp.amount;
        });

        if (hasInputs && machine.outputBuffer.reduce((s, i) => s + i.amount, 0) < 20) {
          machine.isWorking = true;
          machine.craftProgress += scaledDt / recipe.craftTime * def.speed;

          if (machine.craftProgress >= 1) {
            machine.craftProgress = 0;

            // Girdileri tüket
            recipe.inputs.forEach(inp => {
              const buf = machine.inputBuffer.find(b => b.type === inp.type);
              if (buf) buf.amount -= inp.amount;
            });
            machine.inputBuffer = machine.inputBuffer.filter(b => b.amount > 0);

            // Çıktıları üret
            recipe.outputs.forEach(out => {
              const existing = machine.outputBuffer.find(b => b.type === out.type);
              if (existing) existing.amount += out.amount;
              else machine.outputBuffer.push({ type: out.type, amount: out.amount });
              produced[out.type] = (produced[out.type] || 0) + out.amount;
            });
          }
        } else {
          machine.isWorking = false;
        }

        // Çıktıyı konveyöre / sonraki makineye gönder
        if (machine.outputBuffer.length > 0) {
          const outDir = DIR_VECTORS[machine.direction];
          const tx = machine.position.x + outDir.x;
          const ty = machine.position.y + outDir.y;

          if (tx >= 0 && tx < state.gridWidth && ty >= 0 && ty < state.gridHeight) {
            const targetId = state.grid[ty]?.[tx]?.machineId;
            if (targetId && newMachines[targetId]) {
              const target = newMachines[targetId];

              if (isConveyor(target.type) && target.conveyorItems.length < 3) {
                const outItem = machine.outputBuffer[0];
                if (outItem && outItem.amount > 0) {
                  target.conveyorItems.push({
                    id: conveyorItemId(),
                    type: outItem.type,
                    progress: 0,
                  });
                  outItem.amount -= 1;
                  if (outItem.amount <= 0) machine.outputBuffer.shift();
                }
              }
            }
          }
        }
      }

      // === JENERATÖRLER ===
      if (isGenerator(machine.type) && machine.type !== 'solar_panel') {
        // Yakıt bazlı jeneratörler
        const fuelType = machine.type === 'coal_generator' ? 'coal' : 'biofuel';
        const fuel = machine.inputBuffer.find(b => b.type === fuelType);
        if (fuel && fuel.amount > 0) {
          machine.isWorking = true;
          machine.craftProgress += scaledDt * 0.1;
          if (machine.craftProgress >= 1) {
            machine.craftProgress = 0;
            fuel.amount -= 1;
            if (fuel.amount <= 0) {
              machine.inputBuffer = machine.inputBuffer.filter(b => b.amount > 0);
            }
          }
        } else {
          machine.isWorking = false;
        }
      } else if (machine.type === 'solar_panel') {
        machine.isWorking = true;
      }

      // === SATIŞ TERMİNALİ ===
      if (machine.type === 'sell_terminal') {
        machine.inputBuffer.forEach(item => {
          const resDef = RESOURCE_DEFINITIONS[item.type];
          if (resDef && resDef.sellPrice > 0) {
            moneyChange += resDef.sellPrice * item.amount;
          }
        });
        machine.inputBuffer = [];
        machine.isWorking = machine.inputBuffer.length > 0;
      }
    });

    // Stats güncelle
    const newProduced = { ...state.stats.totalProduced };
    Object.entries(produced).forEach(([k, v]) => {
      newProduced[k] = (newProduced[k] || 0) + v;
    });

    set({
      machines: newMachines,
      money: state.money + moneyChange,
      tickCount: state.tickCount + 1,
      stats: {
        ...state.stats,
        totalProduced: newProduced,
        totalPlayTime: state.stats.totalPlayTime + dt,
      },
    });
  },

  saveGame: () => {
    const state = get();
    const saveData = {
      money: state.money,
      chapter: state.chapter,
      grid: state.grid,
      machines: state.machines,
      unlockedMachines: state.unlockedMachines,
      unlockedRecipes: state.unlockedRecipes,
      stats: state.stats,
    };
    localStorage.setItem('factory_tycoon_save', JSON.stringify(saveData));
  },

  loadGame: () => {
    try {
      const raw = localStorage.getItem('factory_tycoon_save');
      if (!raw) return false;
      const data = JSON.parse(raw);
      set({
        money: data.money,
        chapter: data.chapter,
        grid: data.grid,
        machines: data.machines,
        unlockedMachines: data.unlockedMachines,
        unlockedRecipes: data.unlockedRecipes,
        stats: data.stats,
      });
      return true;
    } catch {
      return false;
    }
  },

  resetGame: () => {
    machineIdCounter = 0;
    set({
      money: 500,
      chapter: 1,
      grid: generateMap(GRID_W, GRID_H, 1),
      machines: {},
      unlockedMachines: ['miner_mk1', 'conveyor', 'smelter', 'small_storage', 'trash'],
      unlockedRecipes: ['iron_ingot', 'copper_ingot', 'carbon', 'iron_nail'],
      energyConsumption: 0,
      energyProduction: 50,
      selectedTool: null,
      selectedMachineId: null,
      stats: { totalProduced: {}, totalPlayTime: 0, machinesPlaced: 0 },
      activeDialog: [
        "Mayday, mayday! Kargo gemisi Atlas-7 kontrol kaybetti!",
        "...",
        "Ugh... Neredeyim? Gemi paramparça...",
        "Önce temel malzeme toplamalıyım. Şu demir yatağına bir madenci kursam iyi olur.",
        "Araç çubuğundan ⛏ Madenci seç ve demir yatağının üzerine yerleştir!"
      ],
      dialogIndex: 0,
    });
  },
}));
