import { MachineDefinition } from '@/types';

// ============================================
// TÜM MAKİNE TANIMLARI
// ============================================

export const MACHINES: Record<string, MachineDefinition> = {
  // ---- KAYNAK ÇIKARMA ----
  miner_mk1: {
    type: 'miner_mk1', name: 'Madenci Mk1', description: 'Temel kaynak çıkarıcı',
    category: 'extraction', price: 100, energyConsumption: 5, speed: 1,
    unlockedAtChapter: 1, size: { w: 1, h: 1 },
    color: '#7f8c8d', accentColor: '#95a5a6',
    inputSides: [], outputSides: ['down'],
  },
  miner_mk2: {
    type: 'miner_mk2', name: 'Madenci Mk2', description: '2x hızlı çıkarma',
    category: 'extraction', price: 400, energyConsumption: 10, speed: 2,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#636e72', accentColor: '#b2bec3',
    inputSides: [], outputSides: ['down'],
  },
  miner_mk3: {
    type: 'miner_mk3', name: 'Madenci Mk3', description: '4x hızlı çıkarma',
    category: 'extraction', price: 1500, energyConsumption: 20, speed: 4,
    unlockedAtChapter: 5, size: { w: 1, h: 1 },
    color: '#2d3436', accentColor: '#636e72',
    inputSides: [], outputSides: ['down'],
  },
  water_pump: {
    type: 'water_pump', name: 'Su Pompası', description: 'Su çıkarır',
    category: 'extraction', price: 200, energyConsumption: 8, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#0984e3', accentColor: '#74b9ff',
    inputSides: [], outputSides: ['down'],
  },
  oil_pump: {
    type: 'oil_pump', name: 'Yağ Pompası', description: 'Yağ çıkarır',
    category: 'extraction', price: 300, energyConsumption: 10, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#2d3436', accentColor: '#636e72',
    inputSides: [], outputSides: ['down'],
  },

  // ---- İŞLEME ----
  smelter: {
    type: 'smelter', name: 'Eritici Fırın', description: 'Cevher eritme',
    category: 'processing', price: 200, energyConsumption: 10, speed: 1,
    unlockedAtChapter: 1, size: { w: 1, h: 1 },
    color: '#d63031', accentColor: '#ff7675',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  advanced_smelter: {
    type: 'advanced_smelter', name: 'Gelişmiş Fırın', description: '2x hızlı eritme',
    category: 'processing', price: 800, energyConsumption: 20, speed: 2,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#e17055', accentColor: '#fab1a0',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  cutter: {
    type: 'cutter', name: 'Kesici', description: 'Tel, boru, plaka keser',
    category: 'processing', price: 300, energyConsumption: 8, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#fdcb6e', accentColor: '#ffeaa7',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  chemical_bench: {
    type: 'chemical_bench', name: 'Kimyasal Tezgah', description: 'Sıvı işleme',
    category: 'processing', price: 500, energyConsumption: 12, speed: 1,
    unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#00b894', accentColor: '#55efc4',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  assembler: {
    type: 'assembler', name: 'Montaj Masası', description: 'Parça birleştirme',
    category: 'processing', price: 400, energyConsumption: 15, speed: 1,
    unlockedAtChapter: 2, size: { w: 1, h: 1 },
    color: '#0984e3', accentColor: '#74b9ff',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  advanced_assembler: {
    type: 'advanced_assembler', name: 'Gelişmiş Montaj', description: '2x hızlı montaj',
    category: 'processing', price: 1200, energyConsumption: 25, speed: 2,
    unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#6c5ce7', accentColor: '#a29bfe',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  advanced_factory: {
    type: 'advanced_factory', name: 'İleri Fabrika', description: 'Karmaşık üretim',
    category: 'processing', price: 2000, energyConsumption: 40, speed: 1,
    unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#00cec9', accentColor: '#81ecec',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },
  ship_assembler: {
    type: 'ship_assembler', name: 'Gemi Montaj İst.', description: 'Gemi parçası üretir',
    category: 'processing', price: 5000, energyConsumption: 80, speed: 1,
    unlockedAtChapter: 6, size: { w: 2, h: 2 },
    color: '#e74c3c', accentColor: '#ff7675',
    inputSides: ['left', 'up'], outputSides: ['right', 'down'],
  },

  // ---- KONVEYÖR ----
  conveyor: {
    type: 'conveyor', name: 'Konveyör', description: 'Malzeme taşır',
    category: 'conveyor', price: 5, energyConsumption: 0, speed: 1,
    unlockedAtChapter: 1, size: { w: 1, h: 1 },
    color: '#444444', accentColor: '#666666',
    inputSides: ['left'], outputSides: ['right'],
  },
  fast_conveyor: {
    type: 'fast_conveyor', name: 'Hızlı Konveyör', description: '2x hız',
    category: 'conveyor', price: 15, energyConsumption: 1, speed: 2,
    unlockedAtChapter: 2, size: { w: 1, h: 1 },
    color: '#555555', accentColor: '#f39c12',
    inputSides: ['left'], outputSides: ['right'],
  },
  super_conveyor: {
    type: 'super_conveyor', name: 'Süper Konveyör', description: '4x hız',
    category: 'conveyor', price: 40, energyConsumption: 2, speed: 4,
    unlockedAtChapter: 5, size: { w: 1, h: 1 },
    color: '#666666', accentColor: '#e74c3c',
    inputSides: ['left'], outputSides: ['right'],
  },
  underground_tunnel: {
    type: 'underground_tunnel', name: 'Yeraltı Tünel', description: 'Alttan geçiş',
    category: 'conveyor', price: 30, energyConsumption: 0, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#333333', accentColor: '#555555',
    inputSides: ['left'], outputSides: ['right'],
  },
  splitter: {
    type: 'splitter', name: 'Ayırıcı', description: '1 giriş → 2 çıkış',
    category: 'conveyor', price: 80, energyConsumption: 2, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#fdcb6e', accentColor: '#ffeaa7',
    inputSides: ['left'], outputSides: ['right', 'down'],
  },
  merger: {
    type: 'merger', name: 'Birleştirici', description: '2 giriş → 1 çıkış',
    category: 'conveyor', price: 80, energyConsumption: 2, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#a29bfe', accentColor: '#6c5ce7',
    inputSides: ['left', 'up'], outputSides: ['right'],
  },

  // ---- DEPOLAMA ----
  small_storage: {
    type: 'small_storage', name: 'Küçük Depo', description: '50 birim',
    category: 'storage', price: 100, energyConsumption: 0, speed: 1,
    storageCapacity: 50, unlockedAtChapter: 1, size: { w: 1, h: 1 },
    color: '#8b6914', accentColor: '#b8860b',
    inputSides: ['left', 'up', 'down'], outputSides: ['right'],
  },
  medium_storage: {
    type: 'medium_storage', name: 'Orta Depo', description: '200 birim',
    category: 'storage', price: 300, energyConsumption: 0, speed: 1,
    storageCapacity: 200, unlockedAtChapter: 2, size: { w: 1, h: 1 },
    color: '#a0722a', accentColor: '#c8941e',
    inputSides: ['left', 'up', 'down'], outputSides: ['right'],
  },
  large_storage: {
    type: 'large_storage', name: 'Büyük Depo', description: '1000 birim',
    category: 'storage', price: 800, energyConsumption: 0, speed: 1,
    storageCapacity: 1000, unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#c8a03e', accentColor: '#dab555',
    inputSides: ['left', 'up', 'down'], outputSides: ['right'],
  },
  trash: {
    type: 'trash', name: 'Çöp Kutusu', description: 'Malzeme siler',
    category: 'storage', price: 30, energyConsumption: 0, speed: 1,
    unlockedAtChapter: 1, size: { w: 1, h: 1 },
    color: '#c0392b', accentColor: '#e74c3c',
    inputSides: ['left', 'up', 'right', 'down'], outputSides: [],
  },

  // ---- ENERJİ ----
  fuel_generator: {
    type: 'fuel_generator', name: 'Yakmalı Jeneratör', description: 'Kömür ile +30⚡',
    category: 'energy', price: 300, energyConsumption: -30, speed: 1,
    fuelType: 'coal', fuelPerSecond: 0.5,
    unlockedAtChapter: 2, size: { w: 1, h: 1 },
    color: '#f39c12', accentColor: '#fdcb6e',
    inputSides: ['left', 'up'], outputSides: [],
  },
  bio_generator: {
    type: 'bio_generator', name: 'Bio Jeneratör', description: 'Biyoyakıt ile +40⚡',
    category: 'energy', price: 500, energyConsumption: -40, speed: 1,
    fuelType: 'biofuel', fuelPerSecond: 0.3,
    unlockedAtChapter: 2, size: { w: 1, h: 1 },
    color: '#27ae60', accentColor: '#2ecc71',
    inputSides: ['left', 'up'], outputSides: [],
  },
  solar_panel: {
    type: 'solar_panel', name: 'Güneş Paneli', description: 'Yakıtsız +15⚡',
    category: 'energy', price: 400, energyConsumption: -15, speed: 1,
    unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#2980b9', accentColor: '#3498db',
    inputSides: [], outputSides: [],
  },
  battery_station: {
    type: 'battery_station', name: 'Batarya İstasyonu', description: '500⚡ depolar',
    category: 'energy', price: 600, energyConsumption: 0, speed: 1,
    storageCapacity: 500,
    unlockedAtChapter: 4, size: { w: 1, h: 1 },
    color: '#8e44ad', accentColor: '#9b59b6',
    inputSides: [], outputSides: [],
  },
  nuclear_reactor: {
    type: 'nuclear_reactor', name: 'Nükleer Reaktör', description: 'Uranyum ile +200⚡',
    category: 'energy', price: 5000, energyConsumption: -200, speed: 1,
    fuelType: 'enriched_uranium', fuelPerSecond: 0.1,
    unlockedAtChapter: 5, size: { w: 2, h: 2 },
    color: '#27ae60', accentColor: '#00ff41',
    inputSides: ['left', 'up'], outputSides: [],
  },

  // ---- SATIŞ ----
  sell_terminal: {
    type: 'sell_terminal', name: 'Satış Terminali', description: 'Malzeme satar',
    category: 'selling', price: 500, energyConsumption: 5, speed: 1,
    unlockedAtChapter: 3, size: { w: 1, h: 1 },
    color: '#2ecc71', accentColor: '#27ae60',
    inputSides: ['left', 'up', 'right', 'down'], outputSides: [],
  },
};

// Kategoriye göre makine listesi
export function getMachinesByCategory(category: string): MachineDefinition[] {
  return Object.values(MACHINES).filter(m => m.category === category);
}

// Konveyör mü kontrolü
export function isConveyor(type: string): boolean {
  return ['conveyor', 'fast_conveyor', 'super_conveyor', 'underground_tunnel'].includes(type);
}

export function isSplitterOrMerger(type: string): boolean {
  return ['splitter', 'merger'].includes(type);
}
