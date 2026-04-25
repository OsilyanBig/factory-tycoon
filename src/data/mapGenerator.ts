import { GridCell, TerrainType } from '@/types';

interface DepositConfig {
  terrain: TerrainType;
  count: number;
  size: number; // yarıçap
  minX: number; maxX: number;
  minY: number; maxY: number;
}

function placeDeposit(
  grid: GridCell[][],
  terrain: TerrainType,
  centerX: number,
  centerY: number,
  radius: number,
  width: number,
  height: number
) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius && (dist <= radius * 0.6 || Math.random() > 0.3)) {
          grid[y][x].terrain = terrain;
        }
      }
    }
  }
}

export function generateMap(width: number, height: number, chapter: number): GridCell[][] {
  // Boş grid oluştur
  const grid: GridCell[][] = [];
  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      grid[y][x] = { terrain: 'empty', machineId: null };
    }
  }

  // Merkez (gemi düşme noktası)
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);

  // Birkaç kaya bloğu serpiştirelim
  for (let i = 0; i < 15; i++) {
    const rx = Math.floor(Math.random() * width);
    const ry = Math.floor(Math.random() * height);
    const dist = Math.sqrt((rx - cx) ** 2 + (ry - cy) ** 2);
    if (dist > 8) {
      placeDeposit(grid, 'rock', rx, ry, 1, width, height);
    }
  }

  // Bölüm 1 kaynakları (yakın)
  placeDeposit(grid, 'iron_deposit', cx - 8, cy - 3, 3, width, height);
  placeDeposit(grid, 'iron_deposit', cx + 5, cy + 7, 2, width, height);
  placeDeposit(grid, 'copper_deposit', cx + 8, cy - 4, 2, width, height);
  placeDeposit(grid, 'coal_deposit', cx - 6, cy + 6, 2, width, height);

  // Bölüm 2 kaynakları
  if (chapter >= 2) {
    placeDeposit(grid, 'sand_deposit', cx + 12, cy + 10, 3, width, height);
    placeDeposit(grid, 'biomass_deposit', cx - 12, cy - 8, 3, width, height);
    placeDeposit(grid, 'quartz_deposit', cx + 14, cy - 6, 2, width, height);
  }

  // Bölüm 3 kaynakları
  if (chapter >= 3) {
    placeDeposit(grid, 'gold_deposit', cx - 15, cy - 14, 2, width, height);
    placeDeposit(grid, 'water_deposit', cx + 6, cy - 14, 3, width, height);
    placeDeposit(grid, 'oil_deposit', cx + 16, cy + 5, 2, width, height);
  }

  // Bölüm 4 kaynakları
  if (chapter >= 4) {
    placeDeposit(grid, 'lithium_deposit', cx + 18, cy - 12, 2, width, height);
  }

  // Bölüm 5 kaynakları
  if (chapter >= 5) {
    placeDeposit(grid, 'uranium_deposit', cx - 18, cy + 16, 2, width, height);
    placeDeposit(grid, 'titanium_deposit', cx + 16, cy - 18, 2, width, height);
  }

  return grid;
}
