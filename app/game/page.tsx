'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/components/UI/TopBar';
import Toolbar from '@/components/UI/Toolbar';
import QuestPanel from '@/components/UI/QuestPanel';
import InfoPanel from '@/components/UI/InfoPanel';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useGameStore } from '@/stores/gameStore';

const GameCanvas = dynamic(
  () => import('@/components/Game/GameCanvas'),
  { ssr: false }
);

export default function GamePage() {
  const loadGame = useGameStore(s => s.loadGame);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  useGameLoop();

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#0f0f1a]">
      <div className="absolute inset-0">
        <GameCanvas />
      </div>

      <TopBar />
      <QuestPanel />
      <InfoPanel />
      <Toolbar />
    </div>
  );
}
