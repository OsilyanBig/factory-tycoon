'use client';
import React, { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

export default function QuestPanel() {
  const quests = useGameStore(s => s.quests);
  const [isOpen, setIsOpen] = useState(false);
  const [showDialogue, setShowDialogue] = useState<string | null>(null);

  const activeQuests = quests.filter(q => q.isActive && !q.isCompleted);
  const completedQuests = quests.filter(q => q.isCompleted);

  // Yeni görev diyalogu
  const activeWithDialogue = activeQuests.find(q => q.dialogue && q.dialogue.length > 0);

  return (
    <>
      {/* Görev Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-12 right-2 z-40 bg-[#0f0f23]/90 border border-[#2a2a4a] rounded-lg p-2 text-sm flex items-center gap-1 hover:border-[#4a90d9] transition-all"
      >
        <span>📋</span>
        {activeQuests.length > 0 && (
          <span className="bg-[#4a90d9] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeQuests.length}
          </span>
        )}
      </button>

      {/* Görev Paneli */}
      {isOpen && (
        <div className="fixed top-12 right-2 z-40 w-72 max-h-[70vh] bg-[#0f0f23]/95 backdrop-blur-sm border border-[#2a2a4a] rounded-lg overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[#2a2a4a] flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">📋 Görevler</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto p-2 flex-1">
            {/* Aktif Görevler */}
            {activeQuests.map(quest => (
              <div
                key={quest.id}
                className="bg-[#1a1a2e] rounded p-2 mb-2 border border-[#2a2a4a]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-bold">{quest.title}</span>
                  <span className="text-[10px] text-[#00ffcc]">Bölüm {quest.chapter}</span>
                </div>

                <p className="text-gray-400 text-[10px] mb-2">{quest.description}</p>

                {quest.dialogue && quest.dialogue.length > 0 && (
                  <button
                    onClick={() => setShowDialogue(showDialogue === quest.id ? null : quest.id)}
                    className="text-[10px] text-[#4a90d9] hover:text-[#6ab0ff] mb-1"
                  >
                    💬 Diyaloğu {showDialogue === quest.id ? 'gizle' : 'göster'}
                  </button>
                )}

                {showDialogue === quest.id && quest.dialogue && (
                  <div className="bg-[#0f0f23] rounded p-2 mb-2 text-[10px] text-gray-300 space-y-1">
                    {quest.dialogue.map((line, i) => (
                      <p key={i} className="italic">{line}</p>
                    ))}
                  </div>
                )}

                {quest.objectives.map((obj, i) => {
                  const progress = Math.min(obj.current, obj.amount);
                  const percent = (progress / obj.amount) * 100;
                  const isDone = progress >= obj.amount;

                  return (
                    <div key={i} className="mb-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className={isDone ? 'text-green-400' : 'text-gray-300'}>
                          {isDone ? '✅' : '🔲'} {obj.target.replace(/_/g, ' ')}
                        </span>
                        <span className={isDone ? 'text-green-400' : 'text-gray-400'}>
                          {progress}/{obj.amount}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-[#2a2a4a] rounded-full overflow-hidden mt-0.5">
                        <div
                          className={`h-full rounded-full transition-all ${isDone ? 'bg-green-400' : 'bg-[#4a90d9]'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="text-[10px] text-yellow-400 mt-1">
                  Ödül: {quest.rewards.money}💰
                  {quest.rewards.unlocks && quest.rewards.unlocks.length > 0 && (
                    <span className="text-green-400"> + Yeni açılım!</span>
                  )}
                </div>
              </div>
            ))}

            {activeQuests.length === 0 && (
              <p className="text-gray-500 text-xs text-center py-4">
                Aktif görev yok
              </p>
            )}

            {/* Tamamlanan görevler */}
            {completedQuests.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#2a2a4a]">
                <p className="text-gray-500 text-[10px] mb-1">
                  ✅ Tamamlanan: {completedQuests.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
