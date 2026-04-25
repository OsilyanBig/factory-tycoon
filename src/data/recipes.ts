import { Recipe } from '@/types';

export const RECIPES: Recipe[] = [
  // ===== KATMAN 1 - Eritici Fırın =====
  {
    id: 'iron_ingot', inputs: [{ type: 'iron_ore', amount: 1 }],
    outputs: [{ type: 'iron_ingot', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 1,
  },
  {
    id: 'copper_ingot', inputs: [{ type: 'copper_ore', amount: 1 }],
    outputs: [{ type: 'copper_ingot', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 1,
  },
  {
    id: 'carbon', inputs: [{ type: 'coal', amount: 1 }],
    outputs: [{ type: 'carbon', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 1,
  },
  {
    id: 'glass', inputs: [{ type: 'sand', amount: 2 }],
    outputs: [{ type: 'glass', amount: 1 }], craftTime: 3,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 2,
  },
  {
    id: 'silicon', inputs: [{ type: 'quartz', amount: 2 }],
    outputs: [{ type: 'silicon', amount: 1 }], craftTime: 3,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 2,
  },
  {
    id: 'gold_ingot', inputs: [{ type: 'gold_ore', amount: 1 }],
    outputs: [{ type: 'gold_ingot', amount: 1 }], craftTime: 4,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 3,
  },
  {
    id: 'biofuel', inputs: [{ type: 'biomass', amount: 2 }],
    outputs: [{ type: 'biofuel', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 2,
  },
  {
    id: 'plastic', inputs: [{ type: 'oil', amount: 2 }],
    outputs: [{ type: 'plastic', amount: 1 }], craftTime: 3,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 3,
  },
  {
    id: 'iron_nail', inputs: [{ type: 'iron_ingot', amount: 1 }],
    outputs: [{ type: 'iron_nail', amount: 4 }], craftTime: 1,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 1,
  },
  {
    id: 'copper_plate', inputs: [{ type: 'copper_ingot', amount: 1 }],
    outputs: [{ type: 'copper_plate', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 2,
  },

  // ===== KATMAN 2 - Montaj & Kesici =====
  {
    id: 'steel',
    inputs: [{ type: 'iron_ingot', amount: 2 }, { type: 'carbon', amount: 1 }],
    outputs: [{ type: 'steel', amount: 1 }], craftTime: 4,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 2,
  },
  {
    id: 'copper_wire', inputs: [{ type: 'copper_ingot', amount: 1 }],
    outputs: [{ type: 'copper_wire', amount: 2 }], craftTime: 2,
    machine: ['cutter'], unlockedAtChapter: 3,
  },
  {
    id: 'gold_wire', inputs: [{ type: 'gold_ingot', amount: 1 }],
    outputs: [{ type: 'gold_wire', amount: 2 }], craftTime: 3,
    machine: ['cutter'], unlockedAtChapter: 3,
  },
  {
    id: 'steel_plate', inputs: [{ type: 'steel', amount: 2 }],
    outputs: [{ type: 'steel_plate', amount: 1 }], craftTime: 3,
    machine: ['cutter'], unlockedAtChapter: 3,
  },
  {
    id: 'steel_pipe', inputs: [{ type: 'steel', amount: 1 }],
    outputs: [{ type: 'steel_pipe', amount: 1 }], craftTime: 2,
    machine: ['cutter'], unlockedAtChapter: 3,
  },
  {
    id: 'copper_pipe', inputs: [{ type: 'copper_ingot', amount: 2 }],
    outputs: [{ type: 'copper_pipe', amount: 1 }], craftTime: 3,
    machine: ['cutter'], unlockedAtChapter: 3,
  },
  {
    id: 'carbon_fiber', inputs: [{ type: 'carbon', amount: 3 }],
    outputs: [{ type: 'carbon_fiber', amount: 1 }], craftTime: 5,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'lens',
    inputs: [{ type: 'glass', amount: 2 }],
    outputs: [{ type: 'lens', amount: 1 }], craftTime: 4,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'optical_fiber',
    inputs: [{ type: 'glass', amount: 1 }, { type: 'silicon', amount: 1 }],
    outputs: [{ type: 'optical_fiber', amount: 1 }], craftTime: 4,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'chip',
    inputs: [{ type: 'silicon', amount: 2 }, { type: 'gold_wire', amount: 1 }],
    outputs: [{ type: 'chip', amount: 1 }], craftTime: 5,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'filter',
    inputs: [{ type: 'carbon', amount: 1 }, { type: 'plastic', amount: 1 }],
    outputs: [{ type: 'filter', amount: 1 }], craftTime: 2,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'refined_fuel',
    inputs: [{ type: 'biofuel', amount: 2 }, { type: 'filter', amount: 1 }],
    outputs: [{ type: 'refined_fuel', amount: 1 }], craftTime: 4,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 3,
  },
  {
    id: 'battery_cell',
    inputs: [{ type: 'lithium_ingot', amount: 2 }, { type: 'copper_wire', amount: 1 }],
    outputs: [{ type: 'battery_cell', amount: 1 }], craftTime: 5,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 4,
  },
  {
    id: 'coolant',
    inputs: [{ type: 'pure_water', amount: 2 }, { type: 'carbon', amount: 1 }],
    outputs: [{ type: 'coolant', amount: 1 }], craftTime: 3,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 4,
  },
  {
    id: 'cable_sheath', inputs: [{ type: 'plastic', amount: 2 }],
    outputs: [{ type: 'cable_sheath', amount: 2 }], craftTime: 2,
    machine: ['cutter'], unlockedAtChapter: 3,
  },

  // ===== KATMAN 3 - İleri Fabrika =====
  {
    id: 'cable',
    inputs: [{ type: 'copper_wire', amount: 2 }, { type: 'cable_sheath', amount: 1 }],
    outputs: [{ type: 'cable', amount: 1 }], craftTime: 4,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'conductor',
    inputs: [{ type: 'gold_wire', amount: 2 }, { type: 'silicon', amount: 1 }],
    outputs: [{ type: 'conductor', amount: 1 }], craftTime: 5,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'processor',
    inputs: [{ type: 'chip', amount: 3 }, { type: 'conductor', amount: 2 }],
    outputs: [{ type: 'processor', amount: 1 }], craftTime: 10,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'screen',
    inputs: [{ type: 'glass', amount: 2 }, { type: 'lens', amount: 1 }, { type: 'chip', amount: 1 }],
    outputs: [{ type: 'screen', amount: 1 }], craftTime: 8,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'motor_part',
    inputs: [{ type: 'steel', amount: 3 }, { type: 'steel_pipe', amount: 2 }],
    outputs: [{ type: 'motor_part', amount: 1 }], craftTime: 8,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'hull_panel',
    inputs: [{ type: 'steel_plate', amount: 3 }, { type: 'iron_nail', amount: 5 }],
    outputs: [{ type: 'hull_panel', amount: 1 }], craftTime: 6,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'fuel_line',
    inputs: [{ type: 'steel_pipe', amount: 3 }, { type: 'copper_pipe', amount: 1 }],
    outputs: [{ type: 'fuel_line', amount: 1 }], craftTime: 5,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'cooling_pipe',
    inputs: [{ type: 'copper_pipe', amount: 2 }, { type: 'coolant', amount: 1 }],
    outputs: [{ type: 'cooling_pipe', amount: 1 }], craftTime: 5,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'cooling_system',
    inputs: [{ type: 'cooling_pipe', amount: 3 }, { type: 'copper_plate', amount: 2 }],
    outputs: [{ type: 'cooling_system', amount: 1 }], craftTime: 8,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'light_panel',
    inputs: [{ type: 'carbon_fiber', amount: 2 }, { type: 'plastic', amount: 1 }],
    outputs: [{ type: 'light_panel', amount: 1 }], craftTime: 5,
    machine: ['advanced_factory'], unlockedAtChapter: 4,
  },
  {
    id: 'shield_plate',
    inputs: [{ type: 'light_panel', amount: 2 }, { type: 'steel_plate', amount: 1 }],
    outputs: [{ type: 'shield_plate', amount: 1 }], craftTime: 8,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'rocket_fuel',
    inputs: [{ type: 'refined_fuel', amount: 3 }, { type: 'hydrogen', amount: 2 }],
    outputs: [{ type: 'rocket_fuel', amount: 1 }], craftTime: 10,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'power_pack',
    inputs: [{ type: 'battery_cell', amount: 4 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'power_pack', amount: 1 }], craftTime: 8,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'reactor_core',
    inputs: [{ type: 'fuel_rod', amount: 3 }, { type: 'titanium_alloy', amount: 2 }],
    outputs: [{ type: 'reactor_core', amount: 1 }], craftTime: 15,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'armor_panel',
    inputs: [{ type: 'titanium_alloy', amount: 3 }, { type: 'carbon_fiber', amount: 2 }],
    outputs: [{ type: 'armor_panel', amount: 1 }], craftTime: 10,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'comm_cable',
    inputs: [{ type: 'optical_fiber', amount: 3 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'comm_cable', amount: 1 }], craftTime: 6,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'control_panel',
    inputs: [{ type: 'screen', amount: 1 }, { type: 'processor', amount: 1 }, { type: 'cable', amount: 3 }],
    outputs: [{ type: 'control_panel', amount: 1 }], craftTime: 12,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'insulation',
    inputs: [{ type: 'plastic', amount: 3 }, { type: 'carbon_fiber', amount: 1 }],
    outputs: [{ type: 'insulation', amount: 1 }], craftTime: 4,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },
  {
    id: 'energy_storage',
    inputs: [{ type: 'battery_cell', amount: 6 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'energy_storage', amount: 1 }], craftTime: 10,
    machine: ['advanced_factory'], unlockedAtChapter: 5,
  },

  // Eksik olanlar
  {
    id: 'pure_water', inputs: [{ type: 'water', amount: 2 }],
    outputs: [{ type: 'pure_water', amount: 1 }], craftTime: 2,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 3,
  },
  {
    id: 'lithium_ingot', inputs: [{ type: 'lithium', amount: 1 }],
    outputs: [{ type: 'lithium_ingot', amount: 1 }], craftTime: 4,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 4,
  },
  {
    id: 'enriched_uranium', inputs: [{ type: 'uranium', amount: 3 }],
    outputs: [{ type: 'enriched_uranium', amount: 1 }], craftTime: 8,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 5,
  },
  {
    id: 'titanium_ingot', inputs: [{ type: 'titanium_ore', amount: 2 }],
    outputs: [{ type: 'titanium_ingot', amount: 1 }], craftTime: 6,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 5,
  },
  {
    id: 'hydrogen', inputs: [{ type: 'pure_water', amount: 3 }],
    outputs: [{ type: 'hydrogen', amount: 1 }], craftTime: 5,
    machine: ['smelter', 'advanced_smelter'], unlockedAtChapter: 4,
  },
  {
    id: 'titanium_alloy',
    inputs: [{ type: 'titanium_ingot', amount: 2 }, { type: 'steel', amount: 1 }],
    outputs: [{ type: 'titanium_alloy', amount: 1 }], craftTime: 6,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 5,
  },
  {
    id: 'fuel_rod',
    inputs: [{ type: 'enriched_uranium', amount: 2 }],
    outputs: [{ type: 'fuel_rod', amount: 1 }], craftTime: 8,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 5,
  },
  {
    id: 'memory_module',
    inputs: [{ type: 'chip', amount: 1 }, { type: 'gold_wire', amount: 2 }],
    outputs: [{ type: 'memory_module', amount: 1 }], craftTime: 5,
    machine: ['assembler', 'advanced_assembler'], unlockedAtChapter: 4,
  },

  // ===== KATMAN 4 - Gemi Parçaları =====
  {
    id: 'ship_engine',
    inputs: [{ type: 'motor_part', amount: 3 }, { type: 'cable', amount: 5 }, { type: 'steel', amount: 5 }],
    outputs: [{ type: 'ship_engine', amount: 1 }], craftTime: 30,
    machine: ['ship_assembly'], unlockedAtChapter: 6,
  },
  {
    id: 'ship_hull',
    inputs: [{ type: 'hull_panel', amount: 4 }, { type: 'armor_panel', amount: 2 }, { type: 'insulation', amount: 3 }],
    outputs: [{ type: 'ship_hull', amount: 1 }], craftTime: 30,
    machine: ['ship_assembly'], unlockedAtChapter: 6,
  },
  {
    id: 'ship_fuel_system',
    inputs: [{ type: 'fuel_line', amount: 3 }, { type: 'rocket_fuel', amount: 5 }],
    outputs: [{ type: 'ship_fuel_system', amount: 1 }], craftTime: 25,
    machine: ['ship_assembly'], unlockedAtChapter: 6,
  },
  {
    id: 'ship_fuel_tank',
    inputs: [{ type: 'steel_plate', amount: 5 }, { type: 'rocket_fuel', amount: 10 }],
    outputs: [{ type: 'ship_fuel_tank', amount: 1 }], craftTime: 30,
    machine: ['ship_assembly'], unlockedAtChapter: 6,
  },
  {
    id: 'ship_reactor',
    inputs: [{ type: 'reactor_core', amount: 1 }, { type: 'cooling_system', amount: 2 }, { type: 'cable', amount: 5 }],
    outputs: [{ type: 'ship_reactor', amount: 1 }], craftTime: 45,
    machine: ['ship_assembly'], unlockedAtChapter: 7,
  },
  {
    id: 'ship_backup_power',
    inputs: [{ type: 'power_pack', amount: 3 }, { type: 'energy_storage', amount: 1 }],
    outputs: [{ type: 'ship_backup_power', amount: 1 }], craftTime: 20,
    machine: ['ship_assembly'], unlockedAtChapter: 7,
  },
  {
    id: 'ship_cooling',
    inputs: [{ type: 'cooling_system', amount: 2 }, { type: 'copper_pipe', amount: 5 }],
    outputs: [{ type: 'ship_cooling', amount: 1 }], craftTime: 25,
    machine: ['ship_assembly'], unlockedAtChapter: 7,
  },
  {
    id: 'ship_comm',
    inputs: [{ type: 'comm_cable', amount: 3 }, { type: 'processor', amount: 1 }, { type: 'screen', amount: 1 }],
    outputs: [{ type: 'ship_comm', amount: 1 }], craftTime: 30,
    machine: ['ship_assembly'], unlockedAtChapter: 7,
  },
  {
    id: 'ship_cockpit',
    inputs: [{ type: 'control_panel', amount: 2 }, { type: 'processor', amount: 2 }, { type: 'cable', amount: 5 }],
    outputs: [{ type: 'ship_cockpit', amount: 1 }], craftTime: 35,
    machine: ['ship_assembly'], unlockedAtChapter: 8,
  },
  {
    id: 'ship_shield',
    inputs: [{ type: 'shield_plate', amount: 4 }, { type: 'power_pack', amount: 1 }, { type: 'cable', amount: 3 }],
    outputs: [{ type: 'ship_shield', amount: 1 }], craftTime: 30,
    machine: ['ship_assembly'], unlockedAtChapter: 6,
  },
];

export function getRecipesForMachine(machineType: string): Recipe[] {
  return RECIPES.filter(r => r.machine.includes(machineType as any));
}

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find(r => r.id === id);
}
