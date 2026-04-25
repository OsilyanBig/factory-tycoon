import { Recipe } from '@/types';

// ============================================
// TÜM ÜRETİM REÇETELERİ
// ============================================

export const RECIPES: Recipe[] = [
  // ═══════════════════════════════
  // KATMAN 1 - Eritici Fırın
  // ═══════════════════════════════
  {
    id: 'iron_ingot', machine: 'smelter', craftTime: 2, unlockedAtChapter: 1,
    inputs: [{ type: 'iron_ore', amount: 1 }],
    outputs: [{ type: 'iron_ingot', amount: 1 }],
  },
  {
    id: 'copper_ingot', machine: 'smelter', craftTime: 2, unlockedAtChapter: 1,
    inputs: [{ type: 'copper_ore', amount: 1 }],
    outputs: [{ type: 'copper_ingot', amount: 1 }],
  },
  {
    id: 'carbon', machine: 'smelter', craftTime: 2, unlockedAtChapter: 1,
    inputs: [{ type: 'coal', amount: 1 }],
    outputs: [{ type: 'carbon', amount: 1 }],
  },
  {
    id: 'glass', machine: 'smelter', craftTime: 3, unlockedAtChapter: 2,
    inputs: [{ type: 'sand', amount: 2 }],
    outputs: [{ type: 'glass', amount: 1 }],
  },
  {
    id: 'silicon', machine: 'smelter', craftTime: 3, unlockedAtChapter: 2,
    inputs: [{ type: 'quartz', amount: 2 }],
    outputs: [{ type: 'silicon', amount: 1 }],
  },
  {
    id: 'gold_ingot', machine: 'smelter', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'gold_ore', amount: 1 }],
    outputs: [{ type: 'gold_ingot', amount: 1 }],
  },
  {
    id: 'pure_water', machine: 'smelter', craftTime: 2, unlockedAtChapter: 3,
    inputs: [{ type: 'water', amount: 2 }],
    outputs: [{ type: 'pure_water', amount: 1 }],
  },
  {
    id: 'lithium_ingot', machine: 'smelter', craftTime: 4, unlockedAtChapter: 4,
    inputs: [{ type: 'lithium', amount: 1 }],
    outputs: [{ type: 'lithium_ingot', amount: 1 }],
  },
  {
    id: 'enriched_uranium', machine: 'smelter', craftTime: 8, unlockedAtChapter: 5,
    inputs: [{ type: 'uranium', amount: 3 }],
    outputs: [{ type: 'enriched_uranium', amount: 1 }],
  },
  {
    id: 'titanium_ingot', machine: 'smelter', craftTime: 6, unlockedAtChapter: 5,
    inputs: [{ type: 'titanium_ore', amount: 2 }],
    outputs: [{ type: 'titanium_ingot', amount: 1 }],
  },
  {
    id: 'biofuel', machine: 'smelter', craftTime: 2, unlockedAtChapter: 2,
    inputs: [{ type: 'biomass', amount: 2 }],
    outputs: [{ type: 'biofuel', amount: 1 }],
  },
  {
    id: 'plastic', machine: 'smelter', craftTime: 3, unlockedAtChapter: 3,
    inputs: [{ type: 'oil', amount: 2 }],
    outputs: [{ type: 'plastic', amount: 1 }],
  },
  {
    id: 'iron_nail', machine: 'smelter', craftTime: 1, unlockedAtChapter: 1,
    inputs: [{ type: 'iron_ingot', amount: 1 }],
    outputs: [{ type: 'iron_nail', amount: 4 }],
  },
  {
    id: 'copper_plate', machine: 'smelter', craftTime: 2, unlockedAtChapter: 2,
    inputs: [{ type: 'copper_ingot', amount: 1 }],
    outputs: [{ type: 'copper_plate', amount: 1 }],
  },
  {
    id: 'hydrogen', machine: 'chemical_bench', craftTime: 5, unlockedAtChapter: 4,
    inputs: [{ type: 'pure_water', amount: 3 }],
    outputs: [{ type: 'hydrogen', amount: 2 }],
  },
  {
    id: 'mirror', machine: 'assembler', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'glass', amount: 1 }, { type: 'gold_ingot', amount: 1 }],
    outputs: [{ type: 'mirror', amount: 1 }],
  },

  // ═══════════════════════════════
  // KATMAN 2 - Kesici / Montaj
  // ═══════════════════════════════
  {
    id: 'steel', machine: 'assembler', craftTime: 4, unlockedAtChapter: 2,
    inputs: [{ type: 'iron_ingot', amount: 2 }, { type: 'carbon', amount: 1 }],
    outputs: [{ type: 'steel', amount: 1 }],
  },
  {
    id: 'copper_wire', machine: 'cutter', craftTime: 2, unlockedAtChapter: 3,
    inputs: [{ type: 'copper_ingot', amount: 1 }],
    outputs: [{ type: 'copper_wire', amount: 2 }],
  },
  {
    id: 'gold_wire', machine: 'cutter', craftTime: 3, unlockedAtChapter: 3,
    inputs: [{ type: 'gold_ingot', amount: 1 }],
    outputs: [{ type: 'gold_wire', amount: 2 }],
  },
  {
    id: 'steel_plate', machine: 'cutter', craftTime: 3, unlockedAtChapter: 3,
    inputs: [{ type: 'steel', amount: 2 }],
    outputs: [{ type: 'steel_plate', amount: 1 }],
  },
  {
    id: 'steel_pipe', machine: 'cutter', craftTime: 2, unlockedAtChapter: 3,
    inputs: [{ type: 'steel', amount: 1 }],
    outputs: [{ type: 'steel_pipe', amount: 2 }],
  },
  {
    id: 'copper_pipe', machine: 'cutter', craftTime: 3, unlockedAtChapter: 3,
    inputs: [{ type: 'copper_ingot', amount: 2 }],
    outputs: [{ type: 'copper_pipe', amount: 2 }],
  },
  {
    id: 'carbon_fiber', machine: 'assembler', craftTime: 5, unlockedAtChapter: 3,
    inputs: [{ type: 'carbon', amount: 3 }],
    outputs: [{ type: 'carbon_fiber', amount: 1 }],
  },
  {
    id: 'lens', machine: 'assembler', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'glass', amount: 2 }],
    outputs: [{ type: 'lens', amount: 1 }],
  },
  {
    id: 'optical_fiber', machine: 'assembler', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'glass', amount: 1 }, { type: 'silicon', amount: 1 }],
    outputs: [{ type: 'optical_fiber', amount: 1 }],
  },
  {
    id: 'chip', machine: 'assembler', craftTime: 5, unlockedAtChapter: 3,
    inputs: [{ type: 'silicon', amount: 2 }, { type: 'gold_wire', amount: 1 }],
    outputs: [{ type: 'chip', amount: 1 }],
  },
  {
    id: 'filter', machine: 'assembler', craftTime: 2, unlockedAtChapter: 3,
    inputs: [{ type: 'carbon', amount: 1 }, { type: 'plastic', amount: 1 }],
    outputs: [{ type: 'filter', amount: 1 }],
  },
  {
    id: 'refined_fuel', machine: 'assembler', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'biofuel', amount: 2 }, { type: 'filter', amount: 1 }],
    outputs: [{ type: 'refined_fuel', amount: 1 }],
  },
  {
    id: 'battery_cell', machine: 'assembler', craftTime: 5, unlockedAtChapter: 4,
    inputs: [{ type: 'lithium_ingot', amount: 2 }, { type: 'copper_wire', amount: 1 }],
    outputs: [{ type: 'battery_cell', amount: 1 }],
  },
  {
    id: 'titanium_alloy', machine: 'assembler', craftTime: 6, unlockedAtChapter: 5,
    inputs: [{ type: 'titanium_ingot', amount: 2 }, { type: 'steel', amount: 1 }],
    outputs: [{ type: 'titanium_alloy', amount: 1 }],
  },
  {
    id: 'titanium_wire', machine: 'cutter', craftTime: 4, unlockedAtChapter: 5,
    inputs: [{ type: 'titanium_ingot', amount: 1 }],
    outputs: [{ type: 'titanium_wire', amount: 2 }],
  },
  {
    id: 'cable_sleeve', machine: 'cutter', craftTime: 2, unlockedAtChapter: 3,
    inputs: [{ type: 'plastic', amount: 2 }],
    outputs: [{ type: 'cable_sleeve', amount: 2 }],
  },
  {
    id: 'coolant', machine: 'assembler', craftTime: 3, unlockedAtChapter: 3,
    inputs: [{ type: 'pure_water', amount: 2 }, { type: 'carbon', amount: 1 }],
    outputs: [{ type: 'coolant', amount: 1 }],
  },
  {
    id: 'fuel_rod', machine: 'assembler', craftTime: 8, unlockedAtChapter: 5,
    inputs: [{ type: 'enriched_uranium', amount: 2 }],
    outputs: [{ type: 'fuel_rod', amount: 1 }],
  },
  {
    id: 'solar_concentrator', machine: 'assembler', craftTime: 5, unlockedAtChapter: 3,
    inputs: [{ type: 'mirror', amount: 3 }, { type: 'steel_pipe', amount: 1 }],
    outputs: [{ type: 'solar_concentrator', amount: 1 }],
  },
  {
    id: 'memory_module', machine: 'assembler', craftTime: 5, unlockedAtChapter: 3,
    inputs: [{ type: 'chip', amount: 1 }, { type: 'gold_wire', amount: 2 }],
    outputs: [{ type: 'memory_module', amount: 1 }],
  },

  // ═══════════════════════════════
  // KATMAN 3 - İleri Fabrika
  // ═══════════════════════════════
  {
    id: 'motor_part', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 4,
    inputs: [{ type: 'steel', amount: 3 }, { type: 'steel_pipe', amount: 2 }],
    outputs: [{ type: 'motor_part', amount: 1 }],
  },
  {
    id: 'cable', machine: 'advanced_factory', craftTime: 4, unlockedAtChapter: 3,
    inputs: [{ type: 'copper_wire', amount: 2 }, { type: 'cable_sleeve', amount: 1 }],
    outputs: [{ type: 'cable', amount: 1 }],
  },
  {
    id: 'conductor', machine: 'advanced_factory', craftTime: 5, unlockedAtChapter: 3,
    inputs: [{ type: 'gold_wire', amount: 2 }, { type: 'silicon', amount: 1 }],
    outputs: [{ type: 'conductor', amount: 1 }],
  },
  {
    id: 'processor', machine: 'advanced_factory', craftTime: 10, unlockedAtChapter: 4,
    inputs: [{ type: 'chip', amount: 3 }, { type: 'conductor', amount: 2 }],
    outputs: [{ type: 'processor', amount: 1 }],
  },
  {
    id: 'screen', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 4,
    inputs: [{ type: 'glass', amount: 2 }, { type: 'lens', amount: 1 }, { type: 'chip', amount: 1 }],
    outputs: [{ type: 'screen', amount: 1 }],
  },
  {
    id: 'hull_panel', machine: 'advanced_factory', craftTime: 6, unlockedAtChapter: 4,
    inputs: [{ type: 'steel_plate', amount: 3 }, { type: 'iron_nail', amount: 5 }],
    outputs: [{ type: 'hull_panel', amount: 1 }],
  },
  {
    id: 'fuel_line', machine: 'advanced_factory', craftTime: 5, unlockedAtChapter: 4,
    inputs: [{ type: 'steel_pipe', amount: 3 }, { type: 'copper_pipe', amount: 1 }],
    outputs: [{ type: 'fuel_line', amount: 1 }],
  },
  {
    id: 'cooling_pipe', machine: 'advanced_factory', craftTime: 5, unlockedAtChapter: 4,
    inputs: [{ type: 'copper_pipe', amount: 2 }, { type: 'coolant', amount: 1 }],
    outputs: [{ type: 'cooling_pipe', amount: 1 }],
  },
  {
    id: 'cooling_system', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 4,
    inputs: [{ type: 'cooling_pipe', amount: 3 }, { type: 'copper_plate', amount: 2 }],
    outputs: [{ type: 'cooling_system', amount: 1 }],
  },
  {
    id: 'light_panel', machine: 'advanced_factory', craftTime: 5, unlockedAtChapter: 4,
    inputs: [{ type: 'carbon_fiber', amount: 2 }, { type: 'plastic', amount: 1 }],
    outputs: [{ type: 'light_panel', amount: 1 }],
  },
  {
    id: 'shield', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 4,
    inputs: [{ type: 'light_panel', amount: 2 }, { type: 'steel_plate', amount: 1 }],
    outputs: [{ type: 'shield', amount: 1 }],
  },
  {
    id: 'rocket_fuel', machine: 'advanced_factory', craftTime: 10, unlockedAtChapter: 5,
    inputs: [{ type: 'refined_fuel', amount: 3 }, { type: 'hydrogen', amount: 2 }],
    outputs: [{ type: 'rocket_fuel', amount: 1 }],
  },
  {
    id: 'power_pack', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 5,
    inputs: [{ type: 'battery_cell', amount: 4 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'power_pack', amount: 1 }],
  },
  {
    id: 'reactor_core', machine: 'advanced_factory', craftTime: 15, unlockedAtChapter: 5,
    inputs: [{ type: 'fuel_rod', amount: 3 }, { type: 'titanium_alloy', amount: 2 }],
    outputs: [{ type: 'reactor_core', amount: 1 }],
  },
  {
    id: 'armor_panel', machine: 'advanced_factory', craftTime: 10, unlockedAtChapter: 5,
    inputs: [{ type: 'titanium_alloy', amount: 3 }, { type: 'carbon_fiber', amount: 2 }],
    outputs: [{ type: 'armor_panel', amount: 1 }],
  },
  {
    id: 'comm_cable', machine: 'advanced_factory', craftTime: 6, unlockedAtChapter: 4,
    inputs: [{ type: 'optical_fiber', amount: 3 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'comm_cable', amount: 1 }],
  },
  {
    id: 'control_panel', machine: 'advanced_factory', craftTime: 12, unlockedAtChapter: 4,
    inputs: [{ type: 'screen', amount: 1 }, { type: 'processor', amount: 1 }, { type: 'cable', amount: 3 }],
    outputs: [{ type: 'control_panel', amount: 1 }],
  },
  {
    id: 'hydrogen_cell', machine: 'advanced_factory', craftTime: 8, unlockedAtChapter: 5,
    inputs: [{ type: 'hydrogen', amount: 5 }, { type: 'steel_pipe', amount: 1 }],
    outputs: [{ type: 'hydrogen_cell', amount: 1 }],
  },
  {
    id: 'energy_storage', machine: 'advanced_factory', craftTime: 10, unlockedAtChapter: 5,
    inputs: [{ type: 'battery_cell', amount: 6 }, { type: 'cable', amount: 2 }],
    outputs: [{ type: 'energy_storage', amount: 1 }],
  },
  {
    id: 'insulation', machine: 'advanced_factory', craftTime: 4, unlockedAtChapter: 4,
    inputs: [{ type: 'plastic', amount: 3 }, { type: 'carbon_fiber', amount: 1 }],
    outputs: [{ type: 'insulation', amount: 1 }],
  },

  // ═══════════════════════════════
  // KATMAN 4 - Gemi Montaj İstasyonu
  // ═══════════════════════════════
  {
    id: 'ship_engine', machine: 'ship_assembler', craftTime: 30, unlockedAtChapter: 6,
    inputs: [{ type: 'motor_part', amount: 3 }, { type: 'cable', amount: 5 }, { type: 'steel', amount: 5 }],
    outputs: [{ type: 'ship_engine', amount: 1 }],
  },
  {
    id: 'ship_hull', machine: 'ship_assembler', craftTime: 30, unlockedAtChapter: 6,
    inputs: [{ type: 'hull_panel', amount: 4 }, { type: 'armor_panel', amount: 2 }, { type: 'insulation', amount: 3 }],
    outputs: [{ type: 'ship_hull', amount: 1 }],
  },
  {
    id: 'ship_fuel_system', machine: 'ship_assembler', craftTime: 25, unlockedAtChapter: 6,
    inputs: [{ type: 'fuel_line', amount: 3 }, { type: 'rocket_fuel', amount: 5 }],
    outputs: [{ type: 'ship_fuel_system', amount: 1 }],
  },
  {
    id: 'ship_fuel_tank', machine: 'ship_assembler', craftTime: 30, unlockedAtChapter: 6,
    inputs: [{ type: 'steel_plate', amount: 5 }, { type: 'rocket_fuel', amount: 10 }],
    outputs: [{ type: 'ship_fuel_tank', amount: 1 }],
  },
  {
    id: 'ship_reactor', machine: 'ship_assembler', craftTime: 45, unlockedAtChapter: 7,
    inputs: [{ type: 'reactor_core', amount: 1 }, { type: 'cooling_system', amount: 2 }, { type: 'cable', amount: 5 }],
    outputs: [{ type: 'ship_reactor', amount: 1 }],
  },
  {
    id: 'ship_backup_power', machine: 'ship_assembler', craftTime: 20, unlockedAtChapter: 7,
    inputs: [{ type: 'power_pack', amount: 3 }, { type: 'energy_storage', amount: 1 }],
    outputs: [{ type: 'ship_backup_power', amount: 1 }],
  },
  {
    id: 'ship_cooling', machine: 'ship_assembler', craftTime: 25, unlockedAtChapter: 7,
    inputs: [{ type: 'cooling_system', amount: 2 }, { type: 'copper_pipe', amount: 5 }],
    outputs: [{ type: 'ship_cooling', amount: 1 }],
  },
  {
    id: 'ship_comm', machine: 'ship_assembler', craftTime: 30, unlockedAtChapter: 7,
    inputs: [{ type: 'comm_cable', amount: 3 }, { type: 'processor', amount: 1 }, { type: 'screen', amount: 1 }],
    outputs: [{ type: 'ship_comm', amount: 1 }],
  },
  {
    id: 'ship_cockpit', machine: 'ship_assembler', craftTime: 35, unlockedAtChapter: 8,
    inputs: [{ type: 'control_panel', amount: 2 }, { type: 'processor', amount: 2 }, { type: 'cable', amount: 5 }],
    outputs: [{ type: 'ship_cockpit', amount: 1 }],
  },
  {
    id: 'ship_shield', machine: 'ship_assembler', craftTime: 30, unlockedAtChapter: 6,
    inputs: [{ type: 'shield', amount: 4 }, { type: 'power_pack', amount: 1 }, { type: 'cable', amount: 3 }],
    outputs: [{ type: 'ship_shield', amount: 1 }],
  },
];

// Yardımcı fonksiyonlar
export function getRecipesForMachine(machineType: string): Recipe[] {
  return RECIPES.filter(r => r.machine === machineType);
}

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find(r => r.id === id);
}

export function getRecipesForResource(resourceType: string): Recipe[] {
  return RECIPES.filter(r => r.outputs.some(o => o.type === resourceType));
}
