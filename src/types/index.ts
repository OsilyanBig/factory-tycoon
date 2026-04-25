// ============================================
// TÜM TİP TANIMLARI
// ============================================

export type Direction = 'up' | 'down' | 'left' | 'right';

export type ResourceType =
  // Katman 0 - Ham Maddeler
  | 'iron_ore' | 'copper_ore' | 'coal' | 'sand'
  | 'quartz' | 'gold_ore' | 'biomass' | 'water'
  | 'oil' | 'lithium' | 'uranium' | 'titanium_ore'
  // Katman 1 - Temel İşlenmiş
  | 'iron_ingot' | 'copper_ingot' | 'carbon' | 'glass'
  | 'silicon' | 'gold_ingot' | 'pure_water' | 'lithium_ingot'
  | 'enriched_uranium' | 'titanium_ingot' | 'biofuel' | 'plastic'
  | 'iron_nail' | 'copper_plate' | 'mirror' | 'hydrogen'
  // Katman 2 - Orta Seviye
  | 'steel' | 'copper_wire' | 'gold_wire' | 'steel_plate'
  | 'steel_pipe' | 'copper_pipe' | 'carbon_fiber' | 'lens'
  | 'optical_fiber' | 'chip' | 'filter' | 'refined_fuel'
  | 'battery_cell' | 'titanium_alloy' | 'titanium_wire'
  | 'cable_sheath' | 'coolant' | 'fuel_rod' | 'solar_concentrator'
  | 'memory_module'
  // Katman 3 - İleri Seviye
  | 'motor_part' | 'cable' | 'conductor' | 'processor'
  | 'screen' | 'hull_panel' | 'fuel_line' | 'cooling_pipe'
  | 'cooling_system' | 'light_panel' | 'shield_plate'
  | 'rocket_fuel' | 'power_pack' | 'reactor_core'
  | 'armor_panel' | 'comm_cable' | 'control_panel'
  | 'hydrogen_cell' | 'energy_storage' | 'insulation'
  // Katman 4 - Gemi Parçaları
  | 'ship_engine' | 'ship_hull' | 'ship_fuel_system'
  | 'ship_fuel_tank' | 'ship_reactor' | 'ship_backup_power'
  | 'ship_cooling' | 'ship_comm' | 'ship_cockpit' | 'ship_shield';

export type TerrainType =
  | 'empty' | 'rock' | 'water_terrain'
  | 'iron_deposit' | 'copper_deposit' | 'coal_deposit'
  | 'sand_deposit' | 'quartz_deposit' | 'gold_deposit'
  | 'biomass_deposit' | 'water_deposit' | 'oil_deposit'
  | 'lithium_deposit' | 'uranium_deposit' | 'titanium_deposit';

export type MachineType =
  | 'miner_mk1' | 'miner_mk2' | 'miner_mk3'
  | 'water_pump' | 'oil_pump'
  | 'smelter' | 'advanced_smelter'
  | 'cutter' | 'chemical_plant'
  | 'assembler' | 'advanced_assembler'
  | 'advanced_factory' | 'ship_assembly'
  | 'conveyor' | 'fast_conveyor' | 'super_conveyor'
  | 'underground_input' | 'underground_output'
  | 'splitter' | 'merger'
  | 'small_storage' | 'medium_storage' | 'large_storage'
  | 'trash'
  | 'coal_generator' | 'bio_generator' | 'solar_panel'
  | 'battery_station' | 'nuclear_reactor'
  | 'sell_terminal';

export interface Position {
  x: number;
  y: number;
}

export interface ResourceStack {
  type: ResourceType;
  amount: number;
}

export interface Recipe {
  id: string;
  inputs: ResourceStack[];
  outputs: ResourceStack[];
  craftTime: number; // saniye
  machine: MachineType[];
  unlockedAtChapter: number;
}

export interface ConveyorItem {
  id: string;
  type: ResourceType;
  progress: number; // 0-1 konveyör üzerindeki pozisyon
}

export interface Machine {
  id: string;
  type: MachineType;
  position: Position;
  direction: Direction;
  recipe: Recipe | null;
  inputBuffer: ResourceStack[];
  outputBuffer: ResourceStack[];
  craftProgress: number; // 0-1
  isWorking: boolean;
  conveyorItems: ConveyorItem[];
}

export interface GridCell {
  terrain: TerrainType;
  machineId: string | null;
}

export interface Quest {
  id: string;
  chapter: number;
  title: string;
  description: string;
  dialogBefore?: string[];
  dialogAfter?: string[];
  objectives: QuestObjective[];
  rewards: QuestReward[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface QuestObjective {
  type: 'produce' | 'place' | 'have' | 'sell';
  target?: ResourceType | MachineType;
  amount: number;
  current: number;
}

export interface QuestReward {
  type: 'money' | 'unlock_machine' | 'unlock_recipe' | 'unlock_area';
  value: string | number;
}

export interface GameState {
  // Oyun durumu
  money: number;
  chapter: number;
  totalEnergy: number;
  energyProduction: number;
  energyConsumption: number;
  gameSpeed: number;
  isPaused: boolean;
  tickCount: number;

  // Grid
  gridWidth: number;
  gridHeight: number;
  grid: GridCell[][];
  machines: Record<string, Machine>;

  // Açılmış içerikler
  unlockedMachines: MachineType[];
  unlockedRecipes: string[];
  unlockedAreas: number; // 0-4

  // Görevler
  quests: Quest[];
  activeDialog: string[] | null;
  dialogIndex: number;

  // UI durumu
  selectedTool: MachineType | 'delete' | 'select' | null;
  selectedMachineId: string | null;
  placementDirection: Direction;

  // Kamera
  cameraX: number;
  cameraY: number;
  zoom: number;

  // İstatistikler
  stats: {
    totalProduced: Record<string, number>;
    totalPlayTime: number;
    machinesPlaced: number;
  };
}

export interface MachineDefinition {
  type: MachineType;
  name: string;
  description: string;
  category: 'extraction' | 'processing' | 'conveyor' | 'storage' | 'energy' | 'sell';
  price: number;
  energyConsumption: number;
  energyProduction: number;
  speed: number;
  storageCapacity: number;
  color: string;
  accentColor: string;
  icon: string;
  unlockedAtChapter: number;
  canPlaceOn?: TerrainType[];
  size: { w: number; h: number };
}
