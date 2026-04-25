import { ResourceDefinition, TerrainDefinition } from '@/types';

// ============================================
// TÜM KAYNAK TANIMLARI
// ============================================

export const RESOURCES: Record<string, ResourceDefinition> = {
  // KATMAN 0 - HAM MADDELER
  iron_ore: { type: 'iron_ore', name: 'Demir Cevheri', color: '#95a5a6', tier: 0, sellPrice: 2, unlockedAtChapter: 1 },
  copper_ore: { type: 'copper_ore', name: 'Bakır Cevheri', color: '#e67e22', tier: 0, sellPrice: 3, unlockedAtChapter: 1 },
  coal: { type: 'coal', name: 'Kömür', color: '#2c3e50', tier: 0, sellPrice: 2, unlockedAtChapter: 1 },
  sand: { type: 'sand', name: 'Kum', color: '#f5deb3', tier: 0, sellPrice: 1, unlockedAtChapter: 2 },
  quartz: { type: 'quartz', name: 'Kuvars', color: '#dcdde1', tier: 0, sellPrice: 4, unlockedAtChapter: 2 },
  gold_ore: { type: 'gold_ore', name: 'Altın Cevheri', color: '#f1c40f', tier: 0, sellPrice: 8, unlockedAtChapter: 3 },
  biomass: { type: 'biomass', name: 'Biyokütle', color: '#27ae60', tier: 0, sellPrice: 2, unlockedAtChapter: 2 },
  water: { type: 'water', name: 'Su', color: '#3498db', tier: 0, sellPrice: 1, unlockedAtChapter: 3 },
  oil: { type: 'oil', name: 'Yağ', color: '#1e272e', tier: 0, sellPrice: 5, unlockedAtChapter: 3 },
  lithium: { type: 'lithium', name: 'Lityum', color: '#a29bfe', tier: 0, sellPrice: 10, unlockedAtChapter: 4 },
  uranium: { type: 'uranium', name: 'Uranyum', color: '#00ff41', tier: 0, sellPrice: 20, unlockedAtChapter: 5 },
  titanium_ore: { type: 'titanium_ore', name: 'Titanyum Cevheri', color: '#b8c6db', tier: 0, sellPrice: 15, unlockedAtChapter: 5 },

  // KATMAN 1 - TEMEL İŞLENMİŞ
  iron_ingot: { type: 'iron_ingot', name: 'Demir Külçe', color: '#bdc3c7', tier: 1, sellPrice: 8, unlockedAtChapter: 1 },
  copper_ingot: { type: 'copper_ingot', name: 'Bakır Külçe', color: '#f39c12', tier: 1, sellPrice: 10, unlockedAtChapter: 1 },
  carbon: { type: 'carbon', name: 'Karbon', color: '#34495e', tier: 1, sellPrice: 7, unlockedAtChapter: 1 },
  glass: { type: 'glass', name: 'Cam', color: '#81ecec', tier: 1, sellPrice: 6, unlockedAtChapter: 2 },
  silicon: { type: 'silicon', name: 'Silikon', color: '#636e72', tier: 1, sellPrice: 12, unlockedAtChapter: 2 },
  gold_ingot: { type: 'gold_ingot', name: 'Altın Külçe', color: '#fdcb6e', tier: 1, sellPrice: 25, unlockedAtChapter: 3 },
  pure_water: { type: 'pure_water', name: 'Saf Su', color: '#74b9ff', tier: 1, sellPrice: 4, unlockedAtChapter: 3 },
  lithium_ingot: { type: 'lithium_ingot', name: 'Lityum Külçe', color: '#6c5ce7', tier: 1, sellPrice: 30, unlockedAtChapter: 4 },
  enriched_uranium: { type: 'enriched_uranium', name: 'Zengin. Uranyum', color: '#00ff00', tier: 1, sellPrice: 60, unlockedAtChapter: 5 },
  titanium_ingot: { type: 'titanium_ingot', name: 'Titanyum Külçe', color: '#dfe6e9', tier: 1, sellPrice: 45, unlockedAtChapter: 5 },
  biofuel: { type: 'biofuel', name: 'Biyoyakıt', color: '#00b894', tier: 1, sellPrice: 8, unlockedAtChapter: 2 },
  plastic: { type: 'plastic', name: 'Plastik', color: '#fd79a8', tier: 1, sellPrice: 12, unlockedAtChapter: 3 },
  iron_nail: { type: 'iron_nail', name: 'Demir Çivi', color: '#b2bec3', tier: 1, sellPrice: 5, unlockedAtChapter: 1 },
  copper_plate: { type: 'copper_plate', name: 'Bakır Levha', color: '#e17055', tier: 1, sellPrice: 12, unlockedAtChapter: 2 },
  mirror: { type: 'mirror', name: 'Ayna', color: '#dfe6e9', tier: 1, sellPrice: 30, unlockedAtChapter: 3 },
  hydrogen: { type: 'hydrogen', name: 'Hidrojen', color: '#00cec9', tier: 1, sellPrice: 15, unlockedAtChapter: 4 },

  // KATMAN 2 - ORTA SEVİYE
  steel: { type: 'steel', name: 'Çelik', color: '#576574', tier: 2, sellPrice: 25, unlockedAtChapter: 2 },
  copper_wire: { type: 'copper_wire', name: 'Bakır Tel', color: '#e67e22', tier: 2, sellPrice: 15, unlockedAtChapter: 3 },
  gold_wire: { type: 'gold_wire', name: 'Altın Tel', color: '#f1c40f', tier: 2, sellPrice: 35, unlockedAtChapter: 3 },
  steel_plate: { type: 'steel_plate', name: 'Çelik Plaka', color: '#636e72', tier: 2, sellPrice: 35, unlockedAtChapter: 3 },
  steel_pipe: { type: 'steel_pipe', name: 'Çelik Boru', color: '#636e72', tier: 2, sellPrice: 20, unlockedAtChapter: 3 },
  copper_pipe: { type: 'copper_pipe', name: 'Bakır Boru', color: '#e67e22', tier: 2, sellPrice: 18, unlockedAtChapter: 3 },
  carbon_fiber: { type: 'carbon_fiber', name: 'Karbon Fiber', color: '#2d3436', tier: 2, sellPrice: 40, unlockedAtChapter: 3 },
  lens: { type: 'lens', name: 'Lens', color: '#74b9ff', tier: 2, sellPrice: 30, unlockedAtChapter: 3 },
  optical_fiber: { type: 'optical_fiber', name: 'Optik Fiber', color: '#55efc4', tier: 2, sellPrice: 35, unlockedAtChapter: 3 },
  chip: { type: 'chip', name: 'Çip', color: '#00b894', tier: 2, sellPrice: 50, unlockedAtChapter: 3 },
  filter: { type: 'filter', name: 'Filtre', color: '#b2bec3', tier: 2, sellPrice: 15, unlockedAtChapter: 3 },
  refined_fuel: { type: 'refined_fuel', name: 'Rafine Yakıt', color: '#e17055', tier: 2, sellPrice: 30, unlockedAtChapter: 3 },
  battery_cell: { type: 'battery_cell', name: 'Batarya Hücresi', color: '#6c5ce7', tier: 2, sellPrice: 45, unlockedAtChapter: 4 },
  titanium_alloy: { type: 'titanium_alloy', name: 'Titanyum Alaşım', color: '#dfe6e9', tier: 2, sellPrice: 80, unlockedAtChapter: 5 },
  titanium_wire: { type: 'titanium_wire', name: 'Titanyum Tel', color: '#b8c6db', tier: 2, sellPrice: 50, unlockedAtChapter: 5 },
  cable_sleeve: { type: 'cable_sleeve', name: 'Kablo Kılıfı', color: '#fd79a8', tier: 2, sellPrice: 15, unlockedAtChapter: 3 },
  coolant: { type: 'coolant', name: 'Soğutucu Sıvı', color: '#81ecec', tier: 2, sellPrice: 20, unlockedAtChapter: 3 },
  fuel_rod: { type: 'fuel_rod', name: 'Yakıt Çubuğu', color: '#00ff41', tier: 2, sellPrice: 100, unlockedAtChapter: 5 },
  solar_concentrator: { type: 'solar_concentrator', name: 'Güneş Yoğunlaş.', color: '#ffeaa7', tier: 2, sellPrice: 60, unlockedAtChapter: 3 },
  memory_module: { type: 'memory_module', name: 'Hafıza Modülü', color: '#a29bfe', tier: 2, sellPrice: 55, unlockedAtChapter: 3 },

  // KATMAN 3 - İLERİ SEVİYE
  motor_part: { type: 'motor_part', name: 'Motor Parçası', color: '#636e72', tier: 3, sellPrice: 80, unlockedAtChapter: 4 },
  cable: { type: 'cable', name: 'Kablo', color: '#e67e22', tier: 3, sellPrice: 40, unlockedAtChapter: 3 },
  conductor: { type: 'conductor', name: 'İletken', color: '#fdcb6e', tier: 3, sellPrice: 55, unlockedAtChapter: 3 },
  processor: { type: 'processor', name: 'İşlemci', color: '#00b894', tier: 3, sellPrice: 150, unlockedAtChapter: 4 },
  screen: { type: 'screen', name: 'Ekran', color: '#0984e3', tier: 3, sellPrice: 120, unlockedAtChapter: 4 },
  hull_panel: { type: 'hull_panel', name: 'Gövde Paneli', color: '#636e72', tier: 3, sellPrice: 70, unlockedAtChapter: 4 },
  fuel_line: { type: 'fuel_line', name: 'Yakıt Hattı', color: '#e17055', tier: 3, sellPrice: 55, unlockedAtChapter: 4 },
  cooling_pipe: { type: 'cooling_pipe', name: 'Soğutma Borusu', color: '#74b9ff', tier: 3, sellPrice: 50, unlockedAtChapter: 4 },
  cooling_system: { type: 'cooling_system', name: 'Soğutma Sistemi', color: '#0984e3', tier: 3, sellPrice: 100, unlockedAtChapter: 4 },
  light_panel: { type: 'light_panel', name: 'Hafif Panel', color: '#2d3436', tier: 3, sellPrice: 60, unlockedAtChapter: 4 },
  shield: { type: 'shield', name: 'Koruyucu Kalkan', color: '#6c5ce7', tier: 3, sellPrice: 120, unlockedAtChapter: 4 },
  rocket_fuel: { type: 'rocket_fuel', name: 'Roket Yakıtı', color: '#e74c3c', tier: 3, sellPrice: 100, unlockedAtChapter: 5 },
  power_pack: { type: 'power_pack', name: 'Güç Paketi', color: '#f39c12', tier: 3, sellPrice: 90, unlockedAtChapter: 5 },
  reactor_core: { type: 'reactor_core', name: 'Reaktör Çekirdeği', color: '#00ff41', tier: 3, sellPrice: 250, unlockedAtChapter: 5 },
  armor_panel: { type: 'armor_panel', name: 'Zırh Paneli', color: '#b8c6db', tier: 3, sellPrice: 130, unlockedAtChapter: 5 },
  comm_cable: { type: 'comm_cable', name: 'İletişim Kablosu', color: '#55efc4', tier: 3, sellPrice: 70, unlockedAtChapter: 4 },
  control_panel: { type: 'control_panel', name: 'Kontrol Paneli', color: '#0984e3', tier: 3, sellPrice: 200, unlockedAtChapter: 4 },
  hydrogen_cell: { type: 'hydrogen_cell', name: 'Hidrojen Hücresi', color: '#00cec9', tier: 3, sellPrice: 80, unlockedAtChapter: 5 },
  energy_storage: { type: 'energy_storage', name: 'Enerji Depo', color: '#fdcb6e', tier: 3, sellPrice: 110, unlockedAtChapter: 5 },
  insulation: { type: 'insulation', name: 'Yalıtım', color: '#fd79a8', tier: 3, sellPrice: 40, unlockedAtChapter: 4 },

  // KATMAN 4 - GEMİ PARÇALARI
  ship_engine: { type: 'ship_engine', name: 'Ana Motor', color: '#e74c3c', tier: 4, sellPrice: 0, unlockedAtChapter: 6 },
  ship_hull: { type: 'ship_hull', name: 'Gövde Kaplaması', color: '#636e72', tier: 4, sellPrice: 0, unlockedAtChapter: 6 },
  ship_fuel_system: { type: 'ship_fuel_system', name: 'Yakıt Sistemi', color: '#e67e22', tier: 4, sellPrice: 0, unlockedAtChapter: 6 },
  ship_fuel_tank: { type: 'ship_fuel_tank', name: 'Yakıt Tankı', color: '#e74c3c', tier: 4, sellPrice: 0, unlockedAtChapter: 6 },
  ship_reactor: { type: 'ship_reactor', name: 'Güç Reaktörü', color: '#00ff41', tier: 4, sellPrice: 0, unlockedAtChapter: 7 },
  ship_backup_power: { type: 'ship_backup_power', name: 'Yedek Güç', color: '#f39c12', tier: 4, sellPrice: 0, unlockedAtChapter: 7 },
  ship_cooling: { type: 'ship_cooling', name: 'Soğutma Ünitesi', color: '#0984e3', tier: 4, sellPrice: 0, unlockedAtChapter: 7 },
  ship_comm: { type: 'ship_comm', name: 'İletişim Modülü', color: '#55efc4', tier: 4, sellPrice: 0, unlockedAtChapter: 7 },
  ship_cockpit: { type: 'ship_cockpit', name: 'Kokpit Sistemi', color: '#a29bfe', tier: 4, sellPrice: 0, unlockedAtChapter: 8 },
  ship_shield: { type: 'ship_shield', name: 'Kalkan Sistemi', color: '#6c5ce7', tier: 4, sellPrice: 0, unlockedAtChapter: 6 },
};

// ============================================
// ARAZİ TANIMLARI
// ============================================

export const TERRAINS: Record<string, TerrainDefinition> = {
  empty: { type: 'empty', color: '#1a1a2e', name: 'Boş Alan' },
  rock: { type: 'rock', color: '#2d2d44', name: 'Kaya' },
  water_terrain: { type: 'water_terrain', color: '#1a3a5c', name: 'Su' },
  iron_deposit: { type: 'iron_deposit', resourceType: 'iron_ore', color: '#4a4a5a', name: 'Demir Yatağı' },
  copper_deposit: { type: 'copper_deposit', resourceType: 'copper_ore', color: '#5a3a2a', name: 'Bakır Yatağı' },
  coal_deposit: { type: 'coal_deposit', resourceType: 'coal', color: '#1a1a2a', name: 'Kömür Yatağı' },
  sand_deposit: { type: 'sand_deposit', resourceType: 'sand', color: '#4a4a3a', name: 'Kum Yatağı' },
  quartz_deposit: { type: 'quartz_deposit', resourceType: 'quartz', color: '#4a4a55', name: 'Kuvars Yatağı' },
  gold_deposit: { type: 'gold_deposit', resourceType: 'gold_ore', color: '#4a4a2a', name: 'Altın Yatağı' },
  biomass_deposit: { type: 'biomass_deposit', resourceType: 'biomass', color: '#1a3a1a', name: 'Biyokütle' },
  water_deposit: { type: 'water_deposit', resourceType: 'water', color: '#1a2a4a', name: 'Su Kaynağı' },
  oil_deposit: { type: 'oil_deposit', resourceType: 'oil', color: '#1a1a1a', name: 'Yağ Kaynağı' },
  lithium_deposit: { type: 'lithium_deposit', resourceType: 'lithium', color: '#3a2a4a', name: 'Lityum Yatağı' },
  uranium_deposit: { type: 'uranium_deposit', resourceType: 'uranium', color: '#1a3a1a', name: 'Uranyum 
