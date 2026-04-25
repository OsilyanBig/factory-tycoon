'use client';
import React from 'react';
import { useGameStore } from '@/stores/gameStore';

export default function TopBar() {
  const money = useGameStore(s => s.money);
  const energyProduction = useGameStore(s => s.energyProduction);
  const energyConsumption = useGameStore(s => s.energyConsumption);
  const energyStored = useGameStore(s => s.energyStored);
  const energyCapacity = useGameStore(s => s.energyCapacity);
  const currentChapter = useGameStore(s => s.currentChapter);
  const gameSpeed = useGameStore(s => s.gameSpeed);
  const setGameSpeed = useGameStore(s => s.setGameSpeed);
  const totalPlayTime = useGameStore(s => s.totalPlayTime);

  const netEnergy = energyProduction - energyConsumption;
  const energyPercent = (energyStored / energyCapacity) * 100;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f23]/95 backdrop-blur-sm border-b border-[#2a2a4a] px-2 py-1.5 flex items-center justify-between text-sm select-none">
      {/* Sol: Para ve Enerji */}
      <div className="flex items-center gap-3">
        {/* Para */}
        <div className="flex items-center gap-1 bg-[#1a1a2e] rounded px-2 py-1">
          <span className="text-yellow-400 text-base">💰</span>
          <span className="text-white font-bold">{money.toLocaleString()}</span>
        </div>

        {/* Enerji */}
        <div className="flex items-center gap-1 bg-[#1a1a2e] rounded px-2 py-1">
          <span className="text-yellow-300 text-base">⚡</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="w-16 h-2 bg-[#2a2a4a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    energyPercent > 50 ? 'bg-green-400' :
                    energyPercent > 20 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${energyPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400">
                {Math.floor(energyStored)}
              </span>
            </div>
            <span className={`text-[10px] ${netEnergy >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {netEnergy >= 0 ? '+' : ''}{netEnergy.toFixed(0)}/s
            </span>
          </div>
        </div>
      </div>

      {/* Orta: Bölüm */}
      <div className="flex items-center gap-2">
        <span className="text-[#00ffcc] font-bold text-xs sm:text-sm">
          📖 Bölüm {currentChapter}
        </span>
        <span className="text-gray-500 text-xs hidden sm:inline">
          {formatTime(totalPlayTime)}
        </span>
      </div>

      {/* Sağ: Hız Kontrolleri */}
      <div className="flex items-center gap-1">
        {[1, 2, 3].map(speed => (
          <button
            key={speed}
            onClick={() => setGameSpeed(speed)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all ${
              gameSpeed === speed
                ? 'bg-[#4a90d9] text-white'
                : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a4a]'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
}
