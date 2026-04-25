import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';

// ============================================
// OYUN DÖNGÜSÜ HOOK
// ============================================

export function useGameLoop() {
  const tick = useGameStore(s => s.tick);
  const saveGame = useGameStore(s => s.saveGame);
  const lastTimeRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const saveTimerRef = useRef<number>(0);

  const loop = useCallback((time: number) => {
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
    }

    const deltaMs = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Max delta 100ms (lag koruması)
    const dt = Math.min(deltaMs / 1000, 0.1);

    // Oyun tick
    tick(dt);

    // Otomatik kayıt (30 saniyede bir)
    saveTimerRef.current += dt;
    if (saveTimerRef.current >= 30) {
      saveTimerRef.current = 0;
      saveGame();
    }

    frameRef.current = requestAnimationFrame(loop);
  }, [tick, saveGame]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [loop]);
}
