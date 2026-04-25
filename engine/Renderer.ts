import { GridCell, PlacedMachine, ConveyorItem, Direction } from '@/types';
import { MACHINES, isConveyor } from '@/data/machines';
import { RESOURCES, TERRAINS } from '@/data/resources';
import { COLORS, withAlpha, lighten, darken } from '@/utils/colors';
import { isVisibleInChapter } from '@/utils/mapGenerator';

// ============================================
// ANA CANVAS RENDERER
// ============================================

const CELL_SIZE = 48;

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private animTime: number = 0;
  private particles: Particle[] = [];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  render(
    grid: GridCell[][],
    camera: { x: number; y: number; zoom: number },
    gridWidth: number,
    gridHeight: number,
    chapter: number,
    selectedTool: string,
    hoverCell: { x: number; y: number } | null,
    deltaTime: number
  ) {
    this.animTime += deltaTime;
    const ctx = this.ctx;

    // Temizle
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.save();

    // Kamera transform
    const zoom = camera.zoom;
    const cellPx = CELL_SIZE * zoom;
    const offsetX = this.width / 2 - camera.x * cellPx;
    const offsetY = this.height / 2 - camera.y * cellPx;

    ctx.translate(offsetX, offsetY);
    ctx.scale(zoom, zoom);

    // Görünür alan hesapla
    const startX = Math.max(0, Math.floor(((-offsetX / zoom) / CELL_SIZE) - 1));
    const startY = Math.max(0, Math.floor(((-offsetY / zoom) / CELL_SIZE) - 1));
    const endX = Math.min(gridWidth, Math.ceil(((this.width - offsetX) / zoom) / CELL_SIZE) + 1);
    const endY = Math.min(gridHeight, Math.ceil(((this.height - offsetY) / zoom) / CELL_SIZE) + 1);

    // 1. Arazi çiz
    this.renderTerrain(grid, startX, startY, endX, endY, chapter, gridWidth, gridHeight);

    // 2. Grid çizgileri
    this.renderGrid(startX, startY, endX, endY, chapter, gridWidth, gridHeight);

    // 3. Makineler
    this.renderMachines(grid, startX, startY, endX, endY, chapter, gridWidth, gridHeight);

    // 4. Konveyör itemleri
    this.renderConveyorItems(grid, startX, startY, endX, endY);

    // 5. Hover göster
    if (hoverCell && selectedTool !== 'select') {
      this.renderHoverCell(hoverCell, selectedTool);
    }

    // 6. Parçacıklar
    this.updateAndRenderParticles(deltaTime);

    ctx.restore();
  }

  // ─────────────────────────────────
  // ARAZİ ÇİZİMİ
  // ─────────────────────────────────
  private renderTerrain(
    grid: GridCell[][], sx: number, sy: number, ex: number, ey: number,
    chapter: number, gw: number, gh: number
  ) {
    const ctx = this.ctx;

    for (let y = sy; y < ey; y++) {
      for (let x = sx; x < ex; x++) {
        if (!grid[y]?.[x]) continue;

        const px = x * CELL_SIZE;
        const py = y * CELL_SIZE;

        // Fog of war
        if (!isVisibleInChapter(x, y, chapter, gw, gh)) {
          ctx.fillStyle = COLORS.fog;
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
          continue;
        }

        const cell = grid[y][x];
        const terrainDef = TERRAINS[cell.terrain];

        if (terrainDef) {
          ctx.fillStyle = terrainDef.color;
          ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);

          // Kaynak yatağı efekti - parıltı noktaları
          if (terrainDef.resourceType) {
            const resDef = RESOURCES[terrainDef.resourceType];
            if (resDef) {
              this.renderDepositDetails(px, py, resDef.color, x, y);
            }
          }

          // Kaya dokusu
          if (cell.terrain === 'rock') {
            ctx.fillStyle = withAlpha('#555555', 0.3);
            ctx.fillRect(px + 10, py + 8, 12, 8);
            ctx.fillRect(px + 25, py + 20, 10, 10);
            ctx.fillRect(px + 8, py + 28, 8, 8);
          }

          // Su animasyonu
          if (cell.terrain === 'water_terrain') {
            const wave = Math.sin(this.animTime * 2 + x * 0.5 + y * 0.3) * 0.15;
            ctx.fillStyle = withAlpha('#3498db', 0.2 + wave);
            ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }
  }

  // Kaynak yatağı detayları
  private renderDepositDetails(px: number, py: number, color: string, cellX: number, cellY: number) {
    const ctx = this.ctx;
    const seed = cellX * 7 + cellY * 13;

    // Küçük parlak noktalar
    ctx.fillStyle = withAlpha(color, 0.6);
    for (let i = 0; i < 5; i++) {
      const sx = ((seed * (i + 1) * 17) % 36) + 6;
      const sy = ((seed * (i + 1) * 23) % 36) + 6;
      const size = 2 + (i % 3);
      ctx.beginPath();
      ctx.arc(px + sx, py + sy, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Hafif parlama
    const pulse = Math.sin(this.animTime * 1.5 + seed) * 0.1 + 0.1;
    ctx.fillStyle = withAlpha(color, pulse);
    ctx.fillRect(px + 2, py + 2, CELL_SIZE - 4, CELL_SIZE - 4);
  }

  // ─────────────────────────────────
  // GRID ÇİZGİLERİ
  // ─────────────────────────────────
  private renderGrid(
    sx: number, sy: number, ex: number, ey: number,
    chapter: number, gw: number, gh: number
  ) {
    const ctx = this.ctx;
    ctx.strokeStyle = withAlpha(COLORS.gridLine, 0.4);
    ctx.lineWidth = 0.5;

    for (let y = sy; y <= ey; y++) {
      for (let x = sx; x <= ex; x++) {
        if (!isVisibleInChapter(x, y, chapter, gw, gh)) continue;
        const px = x * CELL_SIZE;
        const py = y * CELL_SIZE;
        ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  // ─────────────────────────────────
  // MAKİNE ÇİZİMLERİ
  // ─────────────────────────────────
  private renderMachines(
    grid: GridCell[][], sx: number, sy: number, ex: number, ey: number,
    chapter: number, gw: number, gh: number
  ) {
    for (let y = sy; y < ey; y++) {
      for (let x = sx; x < ex; x++) {
        if (!grid[y]?.[x]) continue;
        if (!isVisibleInChapter(x, y, chapter, gw, gh)) continue;

        const cell = grid[y][x];
        if (!cell.machine) continue;

        const machine = cell.machine;
        // Sadece sol üst köşede çiz (2x2 makineler için)
        if (machine.x !== x || machine.y !== y) continue;

        if (isConveyor(machine.type)) {
          this.renderConveyor(machine);
        } else {
          this.renderMachine(machine);
        }
      }
    }
  }

  // Tek makine çizimi
  private renderMachine(machine: PlacedMachine) {
    const ctx = this.ctx;
    const def = MACHINES[machine.type];
    if (!def) return;

    const px = machine.x * CELL_SIZE;
    const py = machine.y * CELL_SIZE;
    const w = def.size.w * CELL_SIZE;
    const h = def.size.h * CELL_SIZE;
    const pad = 3;

    // Gölge
    ctx.fillStyle = withAlpha('#000000', 0.3);
    ctx.fillRect(px + pad + 2, py + pad + 2, w - pad * 2, h - pad * 2);

    // Ana gövde
    ctx.fillStyle = def.color;
    ctx.fillRect(px + pad, py + pad, w - pad * 2, h - pad * 2);

    // Üst kenar highlight
    ctx.fillStyle = withAlpha(def.accentColor, 0.5);
    ctx.fillRect(px + pad, py + pad, w - pad * 2, 3);

    // Çalışma animasyonu
    if (machine.isWorking) {
      const pulse = Math.sin(this.animTime * 5) * 0.15 + 0.15;
      ctx.fillStyle = withAlpha(def.accentColor, pulse);
      ctx.fillRect(px + pad, py + pad, w - pad * 2, h - pad * 2);

      // Parçacık oluştur
      if (Math.random() < 0.1) {
        this.spawnParticle(
          px + w / 2, py + h / 2,
          def.accentColor
        );
      }
    }

    // Progress bar
    if (machine.isWorking && machine.progress > 0) {
      const barW = w - pad * 2 - 8;
      const barH = 4;
      const barX = px + pad + 4;
      const barY = py + h - pad - 8;

      ctx.fillStyle = withAlpha('#000000', 0.5);
      ctx.fillRect(barX, barY, barW, barH);

      ctx.fillStyle = COLORS.success;
      ctx.fillRect(barX, barY, barW * machine.progress, barH);
    }

    // Makine ikonu çiz
    this.renderMachineIcon(machine, px + w / 2, py + h / 2, Math.min(w, h));

    // Yön oku
    this.renderDirectionArrow(px + w / 2, py + h / 2, machine.direction, Math.min(w, h) * 0.3);

    // Input/Output buffer göstergesi
    const totalInput = machine.inputBuffer.reduce((s, r) => s + r.amount, 0);
    const totalOutput = machine.outputBuffer.reduce((s, r) => s + r.amount, 0);

    if (totalInput > 0 || totalOutput > 0) {
      ctx.font = '9px monospace';
      ctx.textAlign = 'left';

      if (totalInput > 0) {
        ctx.fillStyle = '#ffaa00';
        ctx.fillText(`▼${totalInput}`, px + pad + 2, py + pad + 12);
      }
      if (totalOutput > 0) {
        ctx.fillStyle = '#00ffaa';
        ctx.fillText(`▲${totalOutput}`, px + w - pad - 18, py + pad + 12);
      }
    }
  }

  // Makine ikonu
  private renderMachineIcon(machine: PlacedMachine, cx: number, cy: number, size: number) {
    const ctx = this.ctx;
    const s = size * 0.25;

    ctx.fillStyle = withAlpha('#ffffff', 0.8);
    ctx.strokeStyle = withAlpha('#ffffff', 0.8);
    ctx.lineWidth = 1.5;

    switch (machine.type) {
      case 'miner_mk1':
      case 'miner_mk2':
      case 'miner_mk3': {
        // Kazma ikonu
        const wobble = machine.isWorking ? Math.sin(this.animTime * 8) * 2 : 0;
        ctx.save();
        ctx.translate(cx, cy + wobble);
        ctx.beginPath();
        ctx.moveTo(-s, -s);
        ctx.lineTo(s * 0.3, s * 0.3);
        ctx.moveTo(-s * 0.5, -s);
        ctx.lineTo(s, -s);
        ctx.lineTo(s, -s * 0.3);
        ctx.stroke();
        ctx.restore();
        break;
      }
      case 'water_pump':
      case 'oil_pump': {
        // Pompa ikonu
        ctx.beginPath();
        ctx.arc(cx, cy - s * 0.3, s * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + s * 0.2);
        ctx.lineTo(cx, cy + s);
        ctx.stroke();
        break;
      }
      case 'smelter':
      case 'advanced_smelter': {
        // Alev ikonu
        const flicker = machine.isWorking ? Math.sin(this.animTime * 10) * 2 : 0;
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(cx, cy - s + flicker);
        ctx.quadraticCurveTo(cx + s, cy, cx + s * 0.5, cy + s);
        ctx.lineTo(cx - s * 0.5, cy + s);
        ctx.quadraticCurveTo(cx - s, cy, cx, cy - s + flicker);
        ctx.fill();
        break;
      }
      case 'cutter': {
        // Makas ikonu
        ctx.beginPath();
        ctx.moveTo(cx - s, cy - s);
        ctx.lineTo(cx + s, cy + s);
        ctx.moveTo(cx + s, cy - s);
        ctx.lineTo(cx - s, cy + s);
        ctx.stroke();
        break;
      }
      case 'assembler':
      case 'advanced_assembler': {
        // Çark ikonu
        const rot = machine.isWorking ? this.animTime * 2 : 0;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        break;
      }
      case 'advanced_factory': {
        // Fabrika ikonu
        ctx.strokeRect(cx - s, cy - s * 0.5, s * 2, s * 1.5);
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.5, cy - s * 0.5);
        ctx.lineTo(cx - s * 0.5, cy - s);
        ctx.lineTo(cx, cy - s * 0.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + s * 0.2, cy - s * 0.5);
        ctx.lineTo(cx + s * 0.2, cy - s);
        ctx.lineTo(cx + s * 0.7, cy - s * 0.5);
        ctx.stroke();
        break;
      }
      case 'ship_assembler': {
        // Roket ikonu
        ctx.beginPath();
        ctx.moveTo(cx, cy - s * 1.2);
        ctx.lineTo(cx + s * 0.6, cy + s);
        ctx.lineTo(cx - s * 0.6, cy + s);
        ctx.closePath();
        ctx.stroke();
        break;
      }
      case 'small_storage':
      case 'medium_storage':
      case 'large_storage': {
        // Kutu ikonu
        ctx.strokeRect(cx - s * 0.7, cy - s * 0.5, s * 1.4, s * 1.2);
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.7, cy);
        ctx.lineTo(cx + s * 0.7, cy);
        ctx.stroke();
        break;
      }
      case 'trash': {
        // Çöp ikonu
        ctx.strokeRect(cx - s * 0.5, cy - s * 0.3, s, s * 1.2);
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.7, cy - s * 0.3);
        ctx.lineTo(cx + s * 0.7, cy - s * 0.3);
        ctx.stroke();
        break;
      }
      case 'fuel_generator':
      case 'bio_generator': {
        // Şimşek ikonu
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.moveTo(cx + s * 0.2, cy - s);
        ctx.lineTo(cx - s * 0.5, cy + s * 0.1);
        ctx.lineTo(cx, cy + s * 0.1);
        ctx.lineTo(cx - s * 0.2, cy + s);
        ctx.lineTo(cx + s * 0.5, cy - s * 0.1);
        ctx.lineTo(cx, cy - s * 0.1);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'solar_panel': {
        // Güneş paneli
        ctx.fillStyle = withAlpha('#3498db', 0.6);
        ctx.fillRect(cx - s * 0.8, cy - s * 0.6, s * 1.6, s * 1.2);
        ctx.strokeStyle = '#74b9ff';
        ctx.beginPath();
        ctx.moveTo(cx, cy - s * 0.6);
        ctx.lineTo(cx, cy + s * 0.6);
        ctx.moveTo(cx - s * 0.8, cy);
        ctx.lineTo(cx + s * 0.8, cy);
        ctx.stroke();
        break;
      }
      case 'nuclear_reactor': {
        // Nükleer sembol
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, s * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, s * 0.8, angle - 0.4, angle + 0.4);
          ctx.stroke();
        }
        break;
      }
      case 'sell_terminal': {
        // Dolar ikonu
        ctx.font = `bold ${s * 1.5}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#2ecc71';
        ctx.fillText('$', cx, cy);
        break;
      }
      case 'splitter': {
        // Ayırma oku
        ctx.beginPath();
        ctx.moveTo(cx - s, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + s * 0.7, cy - s * 0.7);
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + s * 0.7, cy + s * 0.7);
        ctx.stroke();
        break;
      }
      case 'merger': {
        // Birleştirme oku
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.7, cy - s * 0.7);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + s, cy);
        ctx.moveTo(cx - s * 0.7, cy + s * 0.7);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        break;
      }
      case 'chemical_bench': {
        // Deney tüpü
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.3, cy - s);
        ctx.lineTo(cx - s * 0.3, cy + s * 0.3);
        ctx.lineTo(cx - s * 0.7, cy + s);
        ctx.lineTo(cx + s * 0.7, cy + s);
        ctx.lineTo(cx + s * 0.3, cy + s * 0.3);
        ctx.lineTo(cx + s * 0.3, cy - s);
        ctx.stroke();
        break;
      }
      case 'battery_station': {
        // Batarya
        ctx.strokeRect(cx - s * 0.5, cy - s * 0.8, s, s * 1.6);
        ctx.fillRect(cx - s * 0.2, cy - s, s * 0.4, s * 0.2);
        const charge = 0.7;
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(cx - s * 0.4, cy + s * 0.7 - s * 1.4 * charge, s * 0.8, s * 1.4 * charge);
        break;
      }
    }

    // Reset styles
    ctx.strokeStyle = withAlpha('#ffffff', 0.8);
    ctx.lineWidth = 1.5;
  }

  // Yön oku
  private renderDirectionArrow(cx: number, cy: number, dir: Direction, size: number) {
    const ctx = this.ctx;
    ctx.fillStyle = withAlpha('#ffffff', 0.3);
    ctx.beginPath();

    const s = size;
    const offset = CELL_SIZE * 0.35;

    switch (dir) {
      case 'right':
        ctx.moveTo(cx + offset, cy);
        ctx.lineTo(cx + offset - s, cy - s * 0.5);
        ctx.lineTo(cx + offset - s, cy + s * 0.5);
        break;
      case 'left':
        ctx.moveTo(cx - offset, cy);
        ctx.lineTo(cx - offset + s, cy - s * 0.5);
        ctx.lineTo(cx - offset + s, cy + s * 0.5);
        break;
      case 'down':
        ctx.moveTo(cx, cy + offset);
        ctx.lineTo(cx - s * 0.5, cy + offset - s);
        ctx.lineTo(cx + s * 0.5, cy + offset - s);
        break;
      case 'up':
        ctx.moveTo(cx, cy - offset);
        ctx.lineTo(cx - s * 0.5, cy - offset + s);
        ctx.lineTo(cx + s * 0.5, cy - offset + s);
        break;
    }
    ctx.closePath();
    ctx.fill();
  }

  // ─────────────────────────────────
  // KONVEYÖR ÇİZİMİ
  // ─────────────────────────────────
  private renderConveyor(machine: PlacedMachine) {
    const ctx = this.ctx;
    const def = MACHINES[machine.type];
    if (!def) return;

    const px = machine.x * CELL_SIZE;
    const py = machine.y * CELL_SIZE;
    const cs = CELL_SIZE;
    const beltWidth = cs * 0.5;
    const beltOffset = (cs - beltWidth) / 2;

    // Bant arka planı
    ctx.fillStyle = def.color;

    const dir = machine.direction;
    if (dir === 'left' || dir === 'right') {
      ctx.fillRect(px, py + beltOffset, cs, beltWidth);
    } else {
      ctx.fillRect(px + beltOffset, py, beltWidth, cs);
    }

    // Hareket çizgileri
    const speed = def.speed || 1;
    const lineSpacing = 10;
    const animOffset = (this.animTime * 30 * speed) % lineSpacing;

    ctx.strokeStyle = withAlpha(def.accentColor, 0.5);
    ctx.lineWidth = 1;

    if (dir === 'right') {
      for (let i = -1; i < cs / lineSpacing + 1; i++) {
        const lx = px + i * lineSpacing + animOffset;
        if (lx >= px && lx <= px + cs) {
          ctx.beginPath();
          ctx.moveTo(lx, py + beltOffset + 2);
          ctx.lineTo(lx, py + beltOffset + beltWidth - 2);
          ctx.stroke();
        }
      }
    } else if (dir === 'left') {
      for (let i = -1; i < cs / lineSpacing + 1; i++) {
        const lx = px + cs - i * lineSpacing - animOffset;
        if (lx >= px && lx <= px + cs) {
          ctx.beginPath();
          ctx.moveTo(lx, py + beltOffset + 2);
          ctx.lineTo(lx, py + beltOffset + beltWidth - 2);
          ctx.stroke();
        }
      }
    } else if (dir === 'down') {
      for (let i = -1; i < cs / lineSpacing + 1; i++) {
        const ly = py + i * lineSpacing + animOffset;
        if (ly >= py && ly <= py + cs) {
          ctx.beginPath();
          ctx.moveTo(px + beltOffset + 2, ly);
          ctx.lineTo(px + beltOffset + beltWidth - 2, ly);
          ctx.stroke();
        }
      }
    } else if (dir === 'up') {
      for (let i = -1; i < cs / lineSpacing + 1; i++) {
        const ly = py + cs - i * lineSpacing - animOffset;
        if (ly >= py && ly <= py + cs) {
          ctx.beginPath();
          ctx.moveTo(px + beltOffset + 2, ly);
          ctx.lineTo(px + beltOffset + beltWidth - 2, ly);
          ctx.stroke();
        }
      }
    }

    // Kenar çizgileri
    ctx.strokeStyle = withAlpha(def.accentColor, 0.3);
    ctx.lineWidth = 1;
    if (dir === 'left' || dir === 'right') {
      ctx.beginPath();
      ctx.moveTo(px, py + beltOffset);
      ctx.lineTo(px + cs, py + beltOffset);
      ctx.moveTo(px, py + beltOffset + beltWidth);
      ctx.lineTo(px + cs, py + beltOffset + beltWidth);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(px + beltOffset, py);
      ctx.lineTo(px + beltOffset, py + cs);
      ctx.moveTo(px + beltOffset + beltWidth, py);
      ctx.lineTo(px + beltOffset + beltWidth, py + cs);
      ctx.stroke();
    }

    // Hızlı/süper konveyör göstergesi
    if (machine.type === 'fast_conveyor') {
      ctx.fillStyle = withAlpha('#f39c12', 0.4);
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('2x', px + cs / 2, py + cs / 2 + 3);
    } else if (machine.type === 'super_conveyor') {
      ctx.fillStyle = withAlpha('#e74c3c', 0.4);
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('4x', px + cs / 2, py + cs / 2 + 3);
    }
  }

  // ─────────────────────────────────
  // KONVEYÖR ÜZERİNDEKİ EŞYALAR
  // ─────────────────────────────────
  private renderConveyorItems(
    grid: GridCell[][], sx: number, sy: number, ex: number, ey: number
  ) {
    const ctx = this.ctx;

    for (let y = sy; y < ey; y++) {
      for (let x = sx; x < ex; x++) {
        const cell = grid[y]?.[x];
        if (!cell || !cell.machine || !isConveyor(cell.machine.type)) continue;
        if (cell.conveyorItems.length === 0) continue;

        const dir = cell.machine.direction;
        const px = x * CELL_SIZE;
        const py = y * CELL_SIZE;
        const cs = CELL_SIZE;

        for (const item of cell.conveyorItems) {
          const resDef = RESOURCES[item.type];
          if (!resDef) continue;

          let ix: number, iy: number;
          const progress = Math.min(1, item.progress);

          switch (dir) {
            case 'right':
              ix = px + progress * cs;
              iy = py + cs / 2;
              break;
            case 'left':
              ix = px + cs - progress * cs;
              iy = py + cs / 2;
              break;
            case 'down':
              ix = px + cs / 2;
              iy = py + progress * cs;
              break;
            case 'up':
              ix = px + cs / 2;
              iy = py + cs - progress * cs;
              break;
          }

          // Eşya kutusu
          const itemSize = 8;
          ctx.fillStyle = resDef.color;
          ctx.fillRect(ix - itemSize / 2, iy - itemSize / 2, itemSize, itemSize);

          // Parlak kenar
          ctx.strokeStyle = lighten(resDef.color, 0.3);
          ctx.lineWidth = 0.5;
          ctx.strokeRect(ix - itemSize / 2, iy - itemSize / 2, itemSize, itemSize);
        }
      }
    }
  }

  // ─────────────────────────────────
  // HOVER HÜCRE
  // ─────────────────────────────────
  private renderHoverCell(hover: { x: number; y: number }, tool: string) {
    const ctx = this.ctx;
    const px = hover.x * CELL_SIZE;
    const py = hover.y * CELL_SIZE;

    const def = MACHINES[tool];
    const w = def ? def.size.w * CELL_SIZE : CELL_SIZE;
    const h = def ? def.size.h * CELL_SIZE : CELL_SIZE;

    if (tool === 'delete') {
      ctx.fillStyle = withAlpha('#e74c3c', 0.3);
      ctx.fillRect(px, py, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, CELL_SIZE, CELL_SIZE);
    } else {
      ctx.fillStyle = withAlpha('#4a90d9', 0.2);
      ctx.fillRect(px, py, w, h);
      ctx.strokeStyle = withAlpha('#4a90d9', 0.6);
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, w, h);
    }
  }

  // ─────────────────────────────────
  // PARÇACIK SİSTEMİ
  // ─────────────────────────────────
  private spawnParticle(x: number, y: number, color: string) {
    this.particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 30,
      vy: (Math.random() - 0.5) * 30 - 20,
      life: 1,
      maxLife: 1,
      color,
      size: 2 + Math.random() * 3,
    });
  }

  private updateAndRenderParticles(dt: number) {
    const ctx = this.ctx;

    this.particles = this.particles.filter(p => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 50 * dt; // gravity
      p.life -= dt;

      if (p.life <= 0) return false;

      const alpha = p.life / p.maxLife;
      ctx.fillStyle = withAlpha(p.color, alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });

    // Maksimum parçacık sayısı
    if (this.particles.length > 200) {
      this.particles = this.particles.slice(-200);
    }
  }
}

// Parçacık tipi
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// Export cell size for other modules
export { CELL_SIZE };
