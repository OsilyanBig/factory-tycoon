import { GridCell, TerrainType } from '@/types';

// ============================================
// HARİTA OLUŞTURUCU
// ============================================

interface DepositConfig {
  terrain: TerrainType;
  count: number;
  minSize: number;
  maxSize: number;
  chapter: number;
}

const DEPOSIT_CONFIGS: DepositConfig[] = [
  // Bölüm 1
  { terrain: 'iron_deposit', count: 4, minSize: 3, maxSize: 5, chapter: 1 },
  { terrain: 'copper_deposit', count: 3, minSize: 2, maxSize: 4, chapter: 1 },
  { terrain: 'coal_deposit', count: 3, minSize: 2, maxSize: 4, chapter: 1 },
  // Bölüm 2
  { terrain: 'sand_deposit', count: 3, minSize: 3, maxSize: 5, chapter: 2 },
  { terrain: 'quartz_deposit', count: 2, minSize: 2, maxSize: 3, chapter: 2 },
  { terrain: 'biomass_deposit', count: 3, minSize: 3, maxSize: 5, chapter: 2 },
  // Bölüm 3
  { terrain: 'gold_deposit', count: 2, minSize: 2, maxSize: 3, chapter: 3 },
  { terrain: 'water_deposit', count: 2, minSize: 3, maxSize: 4, chapter: 3 },
  { terrain: 'oil_deposit', count: 2, minSize: 2, maxSize: 3, chapter: 3 },
  // Bölüm 4
  { terrain: 'lithium_deposit', count: 2, minSize: 2, maxSize: 3, chapter: 4 },
  // Bölüm 5
  { terrain: 'uranium_deposit', count: 1, minSize: 2, maxSize: 3, chapter: 5 },
  { terrain: 'titanium_deposit', count: 2, minSize: 2, maxSize: 3, chapter: 5 },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function generateMap(width: number, height: number, seed: number = 42): GridCell[][] {
  const random = seededRandom(seed);
  const grid: GridCell[][] = [];

  // Boş grid oluştur
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = {
        x, y,
        terrain: 'empty',
        machine: null,
        conveyorItems: [],
      };
    }
  }

  // Kayalar serpistir (%5)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (random() < 0.03) {
        grid[y][x].terrain = 'rock';
      }
    }
  }

  // Merkez bölge temizle (gemi enkazı alanı)
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  for (let dy = -3; dy <= 3; dy++) {
    for (let dx = -3; dx <= 3; dx++) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        grid[ny][nx].terrain = 'empty';
      }
    }
  }

  // Kaynak yataklarını yerleştir
  for (const config of DEPOSIT_CONFIGS) {
    for (let i = 0; i < config.count; i++) {
      placeDeposit(grid, width, height, config, cx, cy, random);
    }
  }

  // Su engelleri (dekoratif)
  for (let i = 0; i < 3; i++) {
    const wx = Math.floor(random() * (width - 10)) + 5;
    const wy = Math.floor(random() * (height - 10)) + 5;
    const dist = Math.abs(wx - cx) + Math.abs(wy - cy);
    if (dist > 8) {
      for (let dy = 0; dy < 2 + Math.floor(random() * 3); dy++) {
        for (let dx = 0; dx < 2 + Math.floor(random() * 3); dx++) {
          const nx = wx + dx;
          const ny = wy + dy;
          if (nx < width && ny < height && grid[ny][nx].terrain === 'empty') {
            grid[ny][nx].terrain = 'water_terrain';
          }
        }
      }
    }
  }

  return grid;
}

function placeDeposit(
  grid: GridCell[][],
  width: number,
  height: number,
  config: DepositConfig,
  cx: number,
  cy: number,
  random: () => number
) {
  let attempts = 0;
  while (attempts < 50) {
    attempts++;

    // Bölüme göre mesafe ayarla
    let minDist = 5;
    let maxDist = 15;

    if (config.chapter === 2) { minDist = 8; maxDist = 20; }
    if (config.chapter === 3) { minDist = 12; maxDist = 28; }
    if (config.chapter === 4) { minDist = 18; maxDist = 35; }
    if (config.chapter === 5) { minDist = 25; maxDist = 42; }

    const angle = random() * Math.PI * 2;
    const dist = minDist + random() * (maxDist - minDist);
    const px = Math.floor(cx + Math.cos(angle) * dist);
    const py = Math.floor(cy + Math.sin(angle) * dist);

    if (px < 2 || py < 2 || px >= width - 2 || py >= height - 2) continue;

    const size = config.minSize + Math.floor(random() * (config.maxSize - config.minSize + 1));

    // Çakışma kontrolü
    let canPlace = true;
    for (let dy = 0; dy < size && canPlace; dy++) {
      for (let dx = 0; dx < size && canPlace; dx++) {
        const nx = px + dx;
        const ny = py + dy;
        if (nx >= width || ny >= height) { canPlace = false; break; }
        if (grid[ny][nx].terrain !== 'empty' && grid[ny][nx].terrain !== 'rock') {
          canPlace = false;
        }
      }
    }

    if (canPlace) {
      // Organik şekil ver
      for (let dy = 0; dy < size; dy++) {
        for (let dx = 0; dx < size; dx++) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx < width && ny < height) {
            // Köşeleri random at (organik görünüm)
            const isCorner = (dx === 0 || dx === size - 1) && (dy === 0 || dy === size - 1);
            if (isCorner && random() < 0.4) continue;

            grid[ny][nx].terrain = config.terrain;
          }
        }
      }
      return;
    }
  }
}

// Bölüme göre görünür alan kontrolü
export function isVisibleInChapter(x: number, y: number, chapter: number, gridWidth: number, gridHeight: number): boolean {
  const cx = Math.floor(gridWidth / 2);
  const cy = Math.floor(gridHeight / 2);
  const dist = Math.max(Math.abs(x - cx), Math.abs(y - cy));

  const visibleRadius = getVisibleRadius(chapter);
  return dist <= visibleRadius;
}

export function getVisibleRadius(chapter: number): number {
  switch (chapter) {
    case 1: return 18;
    case 2: return 25;
    case 3: return 33;
    case 4: return 40;
    case 5: return 48;
    default: return 55;
  }
}
