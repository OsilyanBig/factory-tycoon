'use client';
import React from 'react';
import { useGameStore } from '@/stores/gameStore';
import { MACHINES } from '@/data/machines';
import { RESOURCES } from '@/data/resources';
import { RECIPES, getRecipesForMachine } from '@/data/recipes';

export default function InfoPanel() {
  const selectedMachine = useGameStore(s => s.selectedMachine);
  const setSelectedMachine = useGameStore(s => s.setSelectedMachine);
  const setMachineRecipe = useGameStore(s => s.setMachineRecipe);
  const removeMachine = useGameStore(s => s.removeMachine);
  const rotateMachine = useGameStore(s => s.rotateMachine);
  const unlockedRecipes = useGameStore(s => s.unlockedRecipes);

  if (!selectedMachine) return null;

  const def = MACHINES[selectedMachine.type];
  if (!def) return null;

  const availableRecipes = getRecipesForMachine(selectedMachine.type)
    .filter(r => unlockedRecipes.includes(r.id));

  const handleRecipeSelect = (recipeId: string) => {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (recipe) {
      setMachineRecipe(selectedMachine.x, selectedMachine.y, recipe);
    }
  };

  return (
    <div className="fixed top-12 left-2 z-40 w-64 bg-[#0f0f23]/95 backdrop-blur-sm border border-[#2a2a4a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-2 border-b border-[#2a2a4a] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor: def.color }}
          />
          <span className="text-white text-sm font-bold">{def.name}</span>
        </div>
        <button
          onClick={() => setSelectedMachine(null)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-2 space-y-2 max-h-[50vh] overflow-y-auto">
        {/* Bilgiler */}
        <div className="text-[10px] text-gray-400">
          <p>{def.description}</p>
          <p className="mt-1">Yön: {selectedMachine.direction}</p>
          <p>Konum: ({selectedMachine.x}, {selectedMachine.y})</p>
          {def.energyConsumption !== 0 && (
            <p className={def.energyConsumption < 0 ? 'text-green-400' : 'text-orange-400'}>
              Enerji: {def.energyConsumption < 0 ? '+' : ''}{-def.energyConsumption}⚡/s
            </p>
          )}
        </div>

        {/* Durum */}
        <div className="bg-[#1a1a2e] rounded p-2">
          <p className="text-[10px] text-gray-400 mb-1">Durum</p>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${selectedMachine.isWorking ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-xs text-white">
              {selectedMachine.isWorking ? 'Çalışıyor' : 'Bekliyor'}
            </span>
          </div>

          {selectedMachine.isWorking && (
            <div className="mt-1">
              <div className="w-full h-2 bg-[#2a2a4a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4a90d9] rounded-full transition-all"
                  style={{ width: `${selectedMachine.progress * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-gray-400">{Math.floor(selectedMachine.progress * 100)}%</span>
            </div>
          )}
        </div>

        {/* Input Buffer */}
        {selectedMachine.inputBuffer.length > 0 && (
          <div className="bg-[#1a1a2e] rounded p-2">
            <p className="text-[10px] text-gray-400 mb-1">Girdi</p>
            {selectedMachine.inputBuffer.map((stack, i) => {
              const res = RESOURCES[stack.type];
              return (
                <div key={i} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: res?.color || '#444' }} />
                  <span className="text-white">{res?.name || stack.type}</span>
                  <span className="text-gray-400">x{stack.amount}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Output Buffer */}
        {selectedMachine.outputBuffer.length > 0 && (
          <div className="bg-[#1a1a2e] rounded p-2">
            <p className="text-[10px] text-gray-400 mb-1">Çıktı</p>
            {selectedMachine.outputBuffer.map((stack, i) => {
              const res = RESOURCES[stack.type];
              return (
                <div key={i} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: res?.color || '#444' }} />
                  <span className="text-white">{res?.name || stack.type}</span>
                  <span className="text-gray-400">x{stack.amount}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Reçete Seçimi */}
        {def.category === 'processing' && availableRecipes.length > 0 && (
          <div className="bg-[#1a1a2e] rounded p-2">
            <p className="text-[10px] text-gray-400 mb-1">Reçete Seç</p>
            <div className="space-y-1">
              {availableRecipes.map(recipe => {
                const isActive = selectedMachine.recipe?.id === recipe.id;
                const outputRes = RESOURCES[recipe.outputs[0]?.type];

                return (
                  <button
                    key={recipe.id}
                    onClick={() => handleRecipeSelect(recipe.id)}
                    className={`w-full text-left p-1.5 rounded text-[10px] transition-all ${
                      isActive
                        ? 'bg-[#4a90d9]/30 border border-[#4a90d9]'
                        : 'bg-[#0f0f23] hover:bg-[#2a2a4a] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: outputRes?.color || '#444' }} />
                      <span className="text-white font-bold">{outputRes?.name || recipe.id}</span>
                      <span className="text-gray-500 ml-auto">{recipe.craftTime}s</span>
                    </div>
                    <div className="text-gray-400">
                      {recipe.inputs.map((inp, i) => {
                        const r = RESOURCES[inp.type];
                        return (
                          <span key={i}>
                            {i > 0 ? ' + ' : ''}
                            {r?.name || inp.type} x{inp.amount}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="flex gap-1">
          <button
            onClick={() => rotateMachine(selectedMachine.x, selectedMachine.y)}
            className="flex-1 bg-[#4a90d9] hover:bg-[#6ab0ff] text-white text-xs py-1.5 rounded transition-all"
          >
            🔄 Döndür
          </button>
          <button
            onClick={() => {
              removeMachine(selectedMachine.x, selectedMachine.y);
              setSelectedMachine(null);
            }}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs py-1.5 rounded transition-all"
          >
            🗑️ Kaldır
          </button>
        </div>
      </div>
    </div>
  );
}
