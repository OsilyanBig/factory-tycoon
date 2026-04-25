'use client';
import React, { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { MACHINES } from '@/data/machines';
import { MachineType, MachineCategory } from '@/types';

const CATEGORY_INFO: Record<string, { icon: string; name: string }> = {
  extraction: { icon: '⛏️', name: 'Çıkarma' },
  processing: { icon: '🔧', name: 'İşleme' },
  conveyor: { icon: '➡️', name: 'Taşıma' },
  storage: { icon: '📦', name: 'Depolama' },
  energy: { icon: '⚡', name: 'Enerji' },
  selling: { icon: '💰', name: 'Satış' },
};

export default function Toolbar() {
  const selectedTool = useGameStore(s => s.selectedTool);
  const setSelectedTool = useGameStore(s => s.setSelectedTool);
  const unlockedMachines = useGameStore(s => s.unlockedMachines);
  const money = useGameStore(s => s.money);
  const [activeCategory, setActiveCategory] = useState<string>('extraction');
  const [showPanel, setShowPanel] = useState(false);

  const categories = Object.keys(CATEGORY_INFO);

  const machinesInCategory = Object.values(MACHINES).filter(
    m => m.category === activeCategory && unlockedMachines.includes(m.type)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 select-none">
      {/* Makine Seçim Paneli */}
      {showPanel && (
        <div className="bg-[#0f0f23]/95 backdrop-blur-sm border-t border-[#2a2a4a] px-2 py-2">
          {/* Kategori Sekmeler */}
          <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
            {categories.map(cat => {
              const info = CATEGORY_INFO[cat];
              const hasMachines = Object.values(MACHINES).some(
                m => m.category === cat && unlockedMachines.includes(m.type)
              );
              if (!hasMachines) return null;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-[#4a90d9] text-white'
                      : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#2a2a4a]'
                  }`}
                >
                  <span>{info.icon}</span>
                  <span className="hidden sm:inline">{info.name}</span>
                </button>
              );
            })}
          </div>

          {/* Makine Listesi */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {machinesInCategory.map(machine => {
              const canAfford = money >= machine.price;
              const isSelected = selectedTool === machine.type;

              return (
                <button
                  key={machine.type}
                  onClick={() => {
                    setSelectedTool(machine.type);
                    if (window.innerWidth < 640) setShowPanel(false);
                  }}
                  className={`flex flex-col items-center min-w-[70px] p-2 rounded border transition-all ${
                    isSelected
                      ? 'border-[#4a90d9] bg-[#4a90d9]/20'
                      : canAfford
                        ? 'border-[#2a2a4a] bg-[#1a1a2e] hover:border-[#4a90d9]/50'
                        : 'border-[#2a2a4a] bg-[#1a1a2e] opacity-50'
                  }`}
                  disabled={!canAfford}
                >
                  <div
                    className="w-8 h-8 rounded mb-1 flex items-center justify-center text-sm"
                    style={{ backgroundColor: machine.color }}
                  >
                    {machine.category === 'extraction' && '⛏️'}
                    {machine.category === 'processing' && '🔧'}
                    {machine.category === 'conveyor' && '➡️'}
                    {machine.category === 'storage' && '📦'}
                    {machine.category === 'energy' && '⚡'}
                    {machine.category === 'selling' && '💰'}
                  </div>
                  <span className="text-[10px] text-white text-center leading-tight">
                    {machine.name}
                  </span>
                  <span className={`text-[10px] ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    {machine.price}💰
                  </span>
                  {machine.energyConsumption !== 0 && (
                    <span className={`text-[9px] ${machine.energyConsumption < 0 ? 'text-green-400' : 'text-orange-400'}`}>
                      {machine.energyConsumption < 0 ? '+' : ''}{-machine.energyConsumption}⚡
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Alt Araç Çubuğu */}
      <div className="bg-[#0a0a1a] border-t border-[#2a2a4a] px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Seç */}
          <button
            onClick={() => { setSelectedTool('select'); setShowPanel(false); }}
            className={`p-2 rounded text-lg transition-all ${
              selectedTool === 'select' && !showPanel
                ? 'bg-[#4a90d9] text-white'
                : 'bg-[#1a1a2e] text-gray-400'
            }`}
            title="Seç"
          >
            👆
          </button>

          {/* Sil */}
          <button
            onClick={() => { setSelectedTool('delete'); setShowPanel(false); }}
            className={`p-2 rounded text-lg transition-all ${
              selectedTool === 'delete'
                ? 'bg-red-600 text-white'
                : 'bg-[#1a1a2e] text-gray-400'
            }`}
            title="Sil"
          >
            🗑️
          </button>

          <div className="w-px h-6 bg-[#2a2a4a] mx-1" />

          {/* İnşa Paneli Toggle */}
          <button
            onClick={() => setShowPanel(!showPanel)}
            className={`p-2 rounded text-lg transition-all ${
              showPanel
                ? 'bg-[#4a90d9] text-white'
                : 'bg-[#1a1a2e] text-gray-400'
            }`}
            title="İnşa Et"
          >
            🏗️
          </button>

          {/* Aktif araç göstergesi */}
          {selectedTool !== 'select' && selectedTool !== 'delete' && (
            <div className="flex items-center gap-1 bg-[#1a1a2e] rounded px-2 py-1 ml-1">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: MACHINES[selectedTool]?.color || '#444' }}
              />
              <span className="text-xs text-white">
                {MACHINES[selectedTool]?.name || selectedTool}
              </span>
            </div>
          )}
        </div>

        {/* Sağ: Döndür */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-500 hidden sm:inline">
            Çift tık: Döndür | Sağ tık: Kaydır
          </span>
        </div>
      </div>
    </div>
  );
}
