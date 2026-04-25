import { Quest } from '@/types';

// ============================================
// TÜM GÖREVLER
// ============================================

export const QUESTS: Quest[] = [
  // ═══════════════════════════════
  // BÖLÜM 1 - DÜŞÜŞ (Tutorial)
  // ═══════════════════════════════
  {
    id: 'q1_1', chapter: 1, title: 'Uyanış',
    description: 'Etrafına bak ve durumu değerlendir.',
    dialogue: [
      'ATLAS: "Ugh... Neredeyim? Geminin yarısı paramparça."',
      'ATLAS: "Önce etrafı keşfetmeliyim. Şu demir yataklarından başlayabilirim."',
    ],
    objectives: [{ type: 'place', target: 'miner_mk1', amount: 1, current: 0 }],
    rewards: { money: 100, unlocks: ['conveyor'] },
    isCompleted: false, isUnlocked: true, isActive: true,
  },
  {
    id: 'q1_2', chapter: 1, title: 'Taşıma Bandı',
    description: 'Konveyörler ile malzeme taşımayı öğren.',
    dialogue: [
      'ATLAS: "Malzemeleri elle taşıyamam. Bir taşıma sistemi kurmalıyım."',
    ],
    objectives: [{ type: 'place', target: 'conveyor', amount: 5, current: 0 }],
    rewards: { money: 50 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q1_3', chapter: 1, title: 'Ateşle Tanış',
    description: 'Eritici fırın kur ve cevherleri işle.',
    dialogue: [
      'ATLAS: "Ham cevher işe yaramaz. Eritmeliyim."',
    ],
    objectives: [{ type: 'place', target: 'smelter', amount: 1, current: 0 }],
    rewards: { money: 200, unlocks: ['smelter'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q1_4', chapter: 1, title: 'İlk Üretim Hattı',
    description: 'Madenci → Konveyör → Fırın hattı kur ve 10 Demir Külçe üret.',
    dialogue: [
      'ATLAS: "Madenci, konveyör ve fırını birleştirirsem otomatik üretim başlar!"',
    ],
    objectives: [{ type: 'produce', target: 'iron_ingot', amount: 10, current: 0 }],
    rewards: { money: 300 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q1_5', chapter: 1, title: 'Biriktir',
    description: 'Bir depo kur ve malzeme depola.',
    dialogue: [
      'ATLAS: "Ürettiğim malzemeleri bir yerde biriktirmeliyim."',
    ],
    objectives: [
      { type: 'place', target: 'small_storage', amount: 1, current: 0 },
      { type: 'produce', target: 'iron_ingot', amount: 20, current: 0 },
    ],
    rewards: { money: 200 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q1_6', chapter: 1, title: 'Bakır Keşfi',
    description: 'Bakır yatağına madenci kur.',
    dialogue: [
      'ATLAS: "Şu turuncu kayaçlar bakır olabilir... Çok işime yarar!"',
    ],
    objectives: [
      { type: 'produce', target: 'copper_ingot', amount: 10, current: 0 },
    ],
    rewards: { money: 300 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 2 - HAYATİ İHTİYAÇLAR
  // ═══════════════════════════════
  {
    id: 'q2_1', chapter: 2, title: 'Kara Elmas',
    description: 'Kömür madencisi kur ve Karbon üret.',
    dialogue: [
      'ATLAS: "Kömür buldum! Karbon üretebilirsem çelik yapabilirim."',
      'NOVA: *bzzzt* "Kaptaaaaan... sistemlerim %8 kapasite..."',
      'ATLAS: "Nova! Hayattasın! Seni tamir edeceğim, söz."',
    ],
    objectives: [{ type: 'produce', target: 'carbon', amount: 10, current: 0 }],
    rewards: { money: 300, unlocks: ['assembler'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q2_2', chapter: 2, title: 'Çelik Çağı',
    description: 'Montaj Masasında Çelik üret.',
    dialogue: [
      'ATLAS: "Demir ve Karbonu birleştirerek Çelik yapabilirim!"',
    ],
    objectives: [{ type: 'produce', target: 'steel', amount: 5, current: 0 }],
    rewards: { money: 500 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q2_3', chapter: 2, title: 'Enerji!',
    description: 'Yakmalı Jeneratör kur.',
    dialogue: [
      'ATLAS: "Makineler güç istiyor. Bir jeneratör kurmalıyım."',
    ],
    objectives: [{ type: 'place', target: 'fuel_generator', amount: 1, current: 0 }],
    rewards: { money: 500, unlocks: ['fuel_generator'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q2_4', chapter: 2, title: 'Cam İşçiliği',
    description: 'Kum yatağı bul ve Cam üret.',
    dialogue: [
      'ATLAS: "Kum kaynaklarından Cam yapabilirim. Birçok şey için lazım olacak."',
    ],
    objectives: [{ type: 'produce', target: 'glass', amount: 10, current: 0 }],
    rewards: { money: 400 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q2_5', chapter: 2, title: 'Yeşil Enerji',
    description: 'Biyokütle topla ve Biyoyakıt üret.',
    dialogue: [
      'ATLAS: "Bu bitkiler enerji kaynağı olabilir!"',
    ],
    objectives: [{ type: 'produce', target: 'biofuel', amount: 10, current: 0 }],
    rewards: { money: 500, unlocks: ['bio_generator'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q2_6', chapter: 2, title: 'Hızlanma',
    description: 'Hızlı konveyör kur.',
    objectives: [{ type: 'place', target: 'fast_conveyor', amount: 10, current: 0 }],
    rewards: { money: 300 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 3 - ENDÜSTRİYEL DEVRİM
  // ═══════════════════════════════
  {
    id: 'q3_1', chapter: 3, title: 'Altın Madenci',
    description: 'Altın yatağını keşfet ve işle.',
    dialogue: [
      'NOVA: "Kaptan, tarama sensörlerimi kısmen onardım."',
      'NOVA: "Gezegende altın, kuvars ve su kaynakları tespit ettim."',
    ],
    objectives: [{ type: 'produce', target: 'gold_ingot', amount: 5, current: 0 }],
    rewards: { money: 800, unlocks: ['cutter'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q3_2', chapter: 3, title: 'Kesim İşleri',
    description: 'Kesici ile Tel ve Plaka üret.',
    objectives: [
      { type: 'produce', target: 'copper_wire', amount: 10, current: 0 },
      { type: 'produce', target: 'steel_plate', amount: 10, current: 0 },
    ],
    rewards: { money: 600 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q3_3', chapter: 3, title: 'Silikon Vadisi',
    description: 'Kuvars işle ve ilk Çip üret.',
    objectives: [{ type: 'produce', target: 'chip', amount: 3, current: 0 }],
    rewards: { money: 1000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q3_4', chapter: 3, title: 'Kablolama',
    description: 'Kablo üretim hattı kur.',
    objectives: [{ type: 'produce', target: 'cable', amount: 5, current: 0 }],
    rewards: { money: 800, unlocks: ['underground_tunnel', 'splitter', 'merger'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q3_5', chapter: 3, title: 'Su Kaynağı',
    description: 'Su pompası kur ve Saf Su üret.',
    objectives: [{ type: 'produce', target: 'pure_water', amount: 10, current: 0 }],
    rewards: { money: 500 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q3_6', chapter: 3, title: 'İlk Satış',
    description: 'Satış terminali kur ve para kazan.',
    objectives: [
      { type: 'place', target: 'sell_terminal', amount: 1, current: 0 },
      { type: 'sell', target: 'any', amount: 500, current: 0 },
    ],
    rewards: { money: 300 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 4 - KALINTILAR
  // ═══════════════════════════════
  {
    id: 'q4_1', chapter: 4, title: 'İleri Üretim',
    description: 'İleri Fabrika kur ve İşlemci üret.',
    dialogue: [
      'NOVA: "Kaptan, kalıntılardaki veritabanını kısmen deşifre ettim."',
      'NOVA: "İleri üretim teknikleri içeriyor!"',
    ],
    objectives: [
      { type: 'place', target: 'advanced_factory', amount: 1, current: 0 },
      { type: 'produce', target: 'processor', amount: 1, current: 0 },
    ],
    rewards: { money: 2000, unlocks: ['advanced_factory'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q4_2', chapter: 4, title: 'Ekran Üretimi',
    description: '3 Ekran üret.',
    objectives: [{ type: 'produce', target: 'screen', amount: 3, current: 0 }],
    rewards: { money: 1500 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q4_3', chapter: 4, title: "Nova'nın Gözleri",
    description: "NOVA için Kontrol Paneli üret.",
    dialogue: [
      'NOVA: "Kaptan! Görüş sistemlerim çevrimiçi!"',
      'NOVA: "Ve... kaptan... kötü haberim var."',
      'NOVA: "Gezegenin manyetik alanı dengesiz. 6 ay içinde yaşanmaz hale gelecek."',
      'ATLAS: "Acele etmeliyiz!"',
    ],
    objectives: [{ type: 'produce', target: 'control_panel', amount: 1, current: 0 }],
    rewards: { money: 2000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q4_4', chapter: 4, title: 'Motor Parçaları',
    description: '3 Motor Parçası üret.',
    objectives: [{ type: 'produce', target: 'motor_part', amount: 3, current: 0 }],
    rewards: { money: 2000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q4_5', chapter: 4, title: 'Güneş Enerjisi',
    description: '5 Güneş Paneli kur.',
    objectives: [{ type: 'place', target: 'solar_panel', amount: 5, current: 0 }],
    rewards: { money: 1500, unlocks: ['solar_panel'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q4_6', chapter: 4, title: 'Batarya Devrimi',
    description: 'Lityum keşfet ve Batarya Hücresi üret.',
    objectives: [{ type: 'produce', target: 'battery_cell', amount: 5, current: 0 }],
    rewards: { money: 2000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 5 - ENERJİ KRİZİ
  // ═══════════════════════════════
  {
    id: 'q5_1', chapter: 5, title: 'Tehlikeli Maden',
    description: 'Uranyum yatağını bul ve çıkar.',
    dialogue: [
      'NOVA: "Nükleer güç lazım. Başka seçeneğimiz yok kaptan."',
      'ATLAS: "Uranyum mu?! Tehlikeli..."',
    ],
    objectives: [{ type: 'produce', target: 'enriched_uranium', amount: 5, current: 0 }],
    rewards: { money: 3000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q5_2', chapter: 5, title: 'Titanyum Çağı',
    description: 'Titanyum Alaşım üret.',
    objectives: [{ type: 'produce', target: 'titanium_alloy', amount: 5, current: 0 }],
    rewards: { money: 3000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q5_3', chapter: 5, title: 'Reaktör Çekirdeği',
    description: 'Nükleer Reaktör Çekirdeği üret.',
    objectives: [{ type: 'produce', target: 'reactor_core', amount: 1, current: 0 }],
    rewards: { money: 5000, unlocks: ['nuclear_reactor'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q5_4', chapter: 5, title: 'NÜKLEER GÜÇ!',
    description: 'Nükleer Reaktör kur.',
    dialogue: [
      'NOVA: "Enerji seviyeleri %100 üzerinde! Gemi sistemlerini çalıştırabiliriz!"',
    ],
    objectives: [{ type: 'place', target: 'nuclear_reactor', amount: 1, current: 0 }],
    rewards: { money: 5000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q5_5', chapter: 5, title: 'Roket Yakıtı',
    description: 'Roket Yakıtı üretim hattı kur.',
    objectives: [{ type: 'produce', target: 'rocket_fuel', amount: 5, current: 0 }],
    rewards: { money: 3000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 6 - GEMİ TAMİRİ
  // ═══════════════════════════════
  {
    id: 'q6_1', chapter: 6, title: 'Gemi Montaj İstasyonu',
    description: 'Gemi Montaj İstasyonu kur.',
    dialogue: [
      'NOVA: "Artık gemi parçalarını üretebiliriz. Ama her parça çok karmaşık."',
      'ATLAS: "Haydi başlayalım Nova. Eve gidiyoruz."',
    ],
    objectives: [{ type: 'place', target: 'ship_assembler', amount: 1, current: 0 }],
    rewards: { money: 5000, unlocks: ['ship_assembler'] },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q6_2', chapter: 6, title: 'Kalkan Sistemi',
    description: 'Gemi Kalkan Sistemi üret.',
    objectives: [{ type: 'produce', target: 'ship_shield', amount: 1, current: 0 }],
    rewards: { money: 5000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q6_3', chapter: 6, title: 'Gövde Kaplaması',
    description: 'Gemi Gövde Kaplaması üret.',
    objectives: [{ type: 'produce', target: 'ship_hull', amount: 1, current: 0 }],
    rewards: { money: 5000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q6_4', chapter: 6, title: 'Yakıt Hazırlığı',
    description: 'Yakıt Sistemi ve Yakıt Tankı üret.',
    objectives: [
      { type: 'produce', target: 'ship_fuel_system', amount: 1, current: 0 },
      { type: 'produce', target: 'ship_fuel_tank', amount: 1, current: 0 },
    ],
    rewards: { money: 8000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 7 - SON HAZIRLIKLAR
  // ═══════════════════════════════
  {
    id: 'q7_1', chapter: 7, title: 'Soğutma Ünitesi',
    description: 'Gemi Soğutma Ünitesi üret.',
    dialogue: [
      'NOVA: "Manyetik alan bozulması hızlanıyor kaptan!"',
    ],
    objectives: [{ type: 'produce', target: 'ship_cooling', amount: 1, current: 0 }],
    rewards: { money: 5000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q7_2', chapter: 7, title: 'Güç Reaktörü',
    description: 'Gemi Güç Reaktörü üret.',
    objectives: [{ type: 'produce', target: 'ship_reactor', amount: 1, current: 0 }],
    rewards: { money: 8000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q7_3', chapter: 7, title: 'Yedek Güç',
    description: 'Gemi Yedek Güç üret.',
    objectives: [{ type: 'produce', target: 'ship_backup_power', amount: 1, current: 0 }],
    rewards: { money: 4000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q7_4', chapter: 7, title: 'İletişim Modülü',
    description: 'Gemi İletişim Modülü üret.',
    objectives: [{ type: 'produce', target: 'ship_comm', amount: 1, current: 0 }],
    rewards: { money: 5000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q7_5', chapter: 7, title: 'Ana Motor',
    description: 'Gemi Ana Motor üret.',
    dialogue: [
      'NOVA: "Motor çevrimiçi! Sadece kokpit kaldı!"',
    ],
    objectives: [{ type: 'produce', target: 'ship_engine', amount: 1, current: 0 }],
    rewards: { money: 8000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },

  // ═══════════════════════════════
  // BÖLÜM 8 - EVE DÖNÜŞ
  // ═══════════════════════════════
  {
    id: 'q8_1', chapter: 8, title: 'Son Parça',
    description: 'Kokpit Sistemi üret.',
    dialogue: [
      'ATLAS: "Son parça Nova. Bundan sonra eve gidiyoruz."',
      'NOVA: "Bu gezegendeki o medeniyet de eve dönmeye çalışıyordu. Başaramamışlar."',
      'ATLAS: "Ama biz başaracağız."',
    ],
    objectives: [{ type: 'produce', target: 'ship_cockpit', amount: 1, current: 0 }],
    rewards: { money: 10000 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
  {
    id: 'q8_2', chapter: 8, title: 'KALKIŞ!',
    description: 'Tüm gemi parçaları hazır. Eve dön!',
    dialogue: [
      'NOVA: "Tüm sistemler çevrimiçi kaptan! Kalkış için hazırız!"',
      'ATLAS: "Elveda küçük gezegen. Bana çok şey öğrettin."',
      '🚀 KALKIŞ!',
    ],
    objectives: [
      { type: 'have', target: 'ship_engine', amount: 1, current: 0 },
      { type: 'have', target: 'ship_hull', amount: 1, current: 0 },
      { type: 'have', target: 'ship_fuel_system', amount: 1, current: 0 },
      { type: 'have', target: 'ship_fuel_tank', amount: 1, current: 0 },
      { type: 'have', target: 'ship_reactor', amount: 1, current: 0 },
      { type: 'have', target: 'ship_backup_power', amount: 1, current: 0 },
      { type: 'have', target: 'ship_cooling', amount: 1, current: 0 },
      { type: 'have', target: 'ship_comm', amount: 1, current: 0 },
      { type: 'have', target: 'ship_cockpit', amount: 1, current: 0 },
      { type: 'have', target: 'ship_shield', amount: 1, current: 0 },
    ],
    rewards: { money: 0 },
    isCompleted: false, isUnlocked: false, isActive: false,
  },
];

export function getQuestsByChapter(chapter: number): Quest[] {
  return QUESTS.filter(q => q.chapter === chapter);
}

export function getNextQuest(currentQuestId: string): Quest | undefined {
  const idx = QUESTS.findIndex(q => q.id === currentQuestId);
  return idx >= 0 && idx < QUESTS.length - 1 ? QUESTS[idx + 1] : undefined;
}
