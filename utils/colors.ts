// ============================================
// RENK PALETİ VE YARDIMCI FONKSİYONLAR
// ============================================

export const COLORS = {
  // Arka plan
  bg: '#0f0f1a',
  gridLine: '#1a1a2e',
  gridLineBright: '#252540',

  // UI
  panelBg: '#0f0f23',
  panelBorder: '#2a2a4a',
  buttonBg: '#4a90d9',
  buttonHover: '#6ab0ff',
  buttonActive: '#3a70b9',
  text: '#ffffff',
  textDim: '#8888aa',
  textAccent: '#00ffcc',
  danger: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',

  // Fog of war
  fog: '#08081a',

  // Terrain
  terrainEmpty: '#12121f',
  terrainRock: '#2d2d3a',
  terrainWater: '#0a1a3a',
};

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export function lighten(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

export function darken(hex: string, amount: number): string {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
