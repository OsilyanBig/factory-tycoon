// ============================================
// FACTORY TYCOON - TÜM TİP TANIMLARI
// ============================================

// Yön
export type Direction = 'up' | 'down' | 'left' | 'right';

// Kaynak tipleri
export type ResourceType =
  // Katman 0 - Ham
  | 'iron_ore' | 'copper_ore' | 'coal' | 'sand'
  | 'quartz' | 'gold_ore' | 'biomass' | 'water'
  | 'oil' | 'lithium' | 'uranium' | 'titanium_ore'
  // Katman 1 - Temel
  | 'iron_ingot' | 'copper_ingot' | 'carbon' | 'glass'
  | 'silicon' | 'gold_ingot' | 'pure_water' | 'lithium_ingot'
  | 'enriched_uranium' | 'titanium_ingot' | 'biofuel' | 'plastic'
  | 'iron_nail' | 'copper_plate' | 'mirror' | 'hydrogen'
  // Katman 2 - Orta
  | 'steel' | 'copper_wire' | 'gold_wire' | 'steel_plate'
  | 'steel_pipe' | 'copper_pipe' | 'carbon_fiber' | 'lens'
  | 'optical_fiber' | 'chip' | 'filter' | 'refined_fuel'
  | 'battery_cell' | 'titanium_alloy' | 'titanium_wire'
  | 'cable_sleeve' | 'coolant' | 'fuel_rod' | 'solar_concentrator'
  | 'memory_module'
  // Katman 3 - İleri
  | 'motor_part' | 'cable' | 'conductor' | 'processor'
  | 'screen' | 'hull_panel' | 'fuel_line' | 'cooling_pipe'
  | 'cooling_system' | 'light_panel' | 'shield' | 'rocket_fuel'
  | 'power_pack' | 'reactor_core' | 'armor_panel'
  | 'comm_cable' | 'control_panel' | 'hydrogen_cell'
  | 'energy_storage' | 'insulation'
  // Katman 4 - Gemi
  | 'ship_engine' | 'ship_hull' | 'ship_fuel_system'
  | 'ship_fuel_tank' | 'ship_reactor' | 'ship_backup_power'
  | 'ship_cooling' | 'ship_comm' | 'ship_cockpit' | 'ship_shield';

// Arazi tipleri
export type TerrainType =
  | 'empty' | 'rock' | 'water_terrain'
  | 'iron_deposit' | 'copper_deposit' | 'coal_deposit'
  | 'sand_deposit' | 'quartz_deposit' | 'gold_deposit'
  | 'biomass_deposit' | 'water_deposit' | 'oil_deposit'
  | 'lithium_deposit' | 'uranium_deposit' | 'titanium_deposit';

// Makine tipleri
export type MachineType =
  | 'miner_mk1' | 'miner_mk2' | 'miner_mk3'
  | 'water_pump' | 'oil_pump'
  | 'smelter' | 'advanced_smelter'
  | 'cutter' | 'chemical_bench'
  | 'assembler' | 'advanced_assembler'
  | 'advanced_factory' | 'ship_assembler'
  | 'conveyor' | 'fast_conveyor' | 'super_conveyor'
  | 'underground_tunnel' | 'splitter' | 'merger'
  | 'small_storage' | 'medium_storage' | 'large_storage'
  | 'trash'
  | 'fuel_generator' | 'bio_generator' | 'solar_panel'
  | 'battery_station' | 'nuclear_reactor'
  | 'sell_terminal';

// Makine kategorisi
export type MachineCategory =
  | 'extraction' | 'processing' | 'conveyor'
  | 'storage' | 'energy' | 'selling';

// Konveyör yerleştirme modu
export type ConveyorPlaceMode = 'single' | 'line' | 'l_shape';

// Kaynak stack
export interface ResourceStack {
  type: ResourceType;
  amount: number;
}

// Reçete
export interface Recipe {
  id: string;
  inputs: ResourceStack[];
  outputs: ResourceStack[];
  craftTime: number; // saniye
  machine: MachineType;
  unlockedAtChapter: number;
}

// Makine tanımı
export interface MachineDefinition {
  type: MachineType;
  name: string;
  description: string;
  category: MachineCategory;
  price: number;
  energyConsumption: number; // negatif = üretir
  speed: number;
  storageCapacity?: number;
  fuelType?: ResourceType;
  fuelPerSecond?: number;
  unlockedAtChapter: number;
  size: { w: number; h: number };
  color: string;
  accentColor: string;
  inputSides: Direction[];
  outputSides: Direction[];
}

// Kaynak tanımı
export interface ResourceDefinition {
  type: ResourceType;
  name: string;
  color: string;
  tier: number; // 0-4
  sellPrice: number;
  unlockedAtChapter: number;
}

// Arazi üzerindeki kaynak tanımı
export interface TerrainDefinition {
  type: TerrainType;
  resourceType?: ResourceType;
  color: string;
  name: string;
}

// Yerleştirilmiş makine
export interface PlacedMachine {
  id: string;
  type: MachineType;
  x: number;
  y: number;
  direction: Direction;
  recipe: Recipe | null;
  inputBuffer: ResourceStack[];
  outputBuffer: ResourceStack[];
  progress: number; // 0-1
  isWorking: boolean;
  fuelBuffer: number;
}

// Konveyör üzerinde hareket eden eşya
export interface ConveyorItem {
  id: string;
  type: ResourceType;
  progress: number; // 0-1 konveyör üzerindeki pozisyon
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

// Grid hücresi
export interface GridCell {
  x: number;
  y: number;
  terrain: TerrainType;
  machine: PlacedMachine | null;
  conveyorItems: ConveyorItem[];
}

// Görev
export interface QuestObjective {
  type: 'produce' | 'place' | 'build' | 'earn' | 'have' | 'sell';
  target: string; // ResourceType veya MachineType
  amount: number;
  current: number;
}

export interface Quest {
  id: string;
  chapter: number;
  title: string;
  description: string;
  dialogue?: string[];
  objectives: QuestObjective[];
  rewards: {
    money: number;
    unlocks?: string[];
  };
  isCompleted: boolean;
  isUnlocked: boolean;
  isActive: boolean;
}

// Oyun durumu
export interface GameState {
  // Temel
  money: number;
  currentChapter: number;
  totalPlayTime: number;
  gameSpeed: number; // 1, 2, 3

  // Grid
  gridWidth: number;
  gridHeight: number;
  grid: GridCell[][];

  // Kamera
  camera: {
    x: number;
    y: number;
    zoom: number;
  };

  // Enerji
  energyProduction: number;
  energyConsumption: number;
  energyStored: number;
  energyCapacity: number;

  // Envanter (toplam üretilen)
  totalProduced: Record<string, number>;
  totalSold: Record<string, number>;

  // UI durumu
  selectedTool: MachineType | 'select' | 'delete';
  selectedMachine: PlacedMachine | null;
  conveyorPlaceMode: ConveyorPlaceMode;

  // Görevler
  quests: Quest[];

  // Açılmış öğeler
  unlockedMachines: MachineType[];
  unlockedRecipes: string[];
  unlockedResources: ResourceType[];

  // İstatistikler
  stats: {
    machinesPlaced: number;
    conveyorsPlaced: number;
    itemsProduced: number;
    totalMoneyEarned: number;
  };
}

// Kamera state
export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  lastPinchDist: number;
}

// Konveyör sürükleme durumu
export interface ConveyorDragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  path: { x: number; y: number; direction: Direction }[];
  mode: ConveyorPlaceMode;
}
