'use client';
import React from 'react';
import { useCanvas } from '@/hooks/useCanvas';

export default function GameCanvas() {
  const { canvasRef } = useCanvas();

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block touch-none"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}
