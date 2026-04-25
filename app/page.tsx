'use client';
import React, { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';

export default function MainMenu() {
  const loadGame = useGameStore(s => s.loadGame);
  const startNewGame = useGameStore(s => s.startNewGame);
  const [hasSave, setHasSave] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyStep, setStoryStep] = useState(0);

  useEffect(() => {
    const save = localStorage.getItem('factoryTycoonSave');
    setHasSave(!!save);
  }, []);

  const handleNewGame = () => {
    startNewGame();
    setShowStory(true);
    setStoryStep(0);
  };

  const handleContinue = () => {
    const success = loadGame();
    if (success) {
      window.location.href = '/game';
    }
  };

  const storyLines = [
    { speaker: '📡', text: 'Yıl 2147. Kargo gemisi Atlas-7, bilinmeyen bir gezegenin yörüngesinde...' },
    { speaker: '📡', text: '"Mayday, mayday! Kontrol kaybettik! Acil iniş yapıyo—"' },
    { speaker: '💥', text: '*CRASH*' },
    { speaker: '🧑‍🚀', text: '"Ugh... Neredeyim? Geminin yarısı paramparça."' },
    { speaker: '🧑‍🚀', text: '"Hayatta kalmak için bu gezegenin kaynaklarını kullanmalıyım."' },
    { speaker: '🧑‍🚀', text: '"Bir fabrika kuracağım. Gemiyi tamir edeceğim. Eve döneceğim."' },
  ];

  if (showStory) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a15] p-4">
        <div className="max-w-lg w-full">
          {storyLines.slice(0, storyStep + 1).map((line, i) => (
            <div
              key={i}
              className="mb-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{line.speaker}</span>
                <p className={`text-sm ${line.speaker === '💥' ? 'text-red-400 font-bold text-xl' : 'text-gray-300'}`}>
                  {line.text}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-center">
            {storyStep < storyLines.length - 1 ? (
              <button
                onClick={() => setStoryStep(s => s + 1)}
                className="bg-[#4a90d9] hover:bg-[#6ab0ff] text-white px-6 py-2 rounded-lg transition-all text-sm"
              >
                Devam →
              </button>
            ) : (
              <button
                onClick={() => window.location.href = '/game'}
                className="bg-[#2ecc71] hover:bg-[#27ae60] text-white px-8 py-3 rounded-lg transition-all font-bold animate-pulse"
              >
                🚀 Fabrikayı Kur!
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0a0a15]">
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-2">
          <span className="text-[#4a90d9]">FACTORY</span>
          <span className="text-white"> TYCOON</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-2xl mb-4">
          <span>⚙️</span>
          <span>🏭</span>
          <span>⚙️</span>
        </div>
        <p className="text-gray-500 text-sm">Gezegende mahsur. Fabrika kur. Eve dön.</p>
      </div>

      {/* Butonlar */}
      <div className="flex flex-col gap-3 w-64">
        {hasSave && (
          <button
            onClick={handleContinue}
            className="bg-[#4a90d9] hover:bg-[#6ab0ff] text-white py-3 px-6 rounded-lg font-bold transition-all text-lg"
          >
            ▶ Devam Et
          </button>
        )}

        <button
          onClick={handleNewGame}
          className={`${hasSave ? 'bg-[#1a1a2e] hover:bg-[#2a2a4a] text-gray-300' : 'bg-[#4a90d9] hover:bg-[#6ab0ff] text-white'} py-3 px-6 rounded-lg font-bold transition-all text-lg`}
        >
          🆕 Yeni Oyun
        </button>

        <button
          onClick={() => alert(
            'KONTROLLER:\n\n' +
            '🖱️ PC:\n' +
            '- Sol tık: Yerleştir/Seç\n' +
            '- Sağ tık sürükle: Kaydır\n' +
            '- Scroll: Zoom\n' +
            '- Çift tık: Döndür\n\n' +
            '📱 Mobil:\n' +
            '- Dokun: Yerleştir/Seç\n' +
            '- Sürükle: Kaydır\n' +
            '- Çift dokun: Döndür\n' +
            '- İki parmak: Zoom\n\n' +
            '🔧 Konveyör:\n' +
            '- Konveyör seçip sürükle = otomatik hat çek!'
          )}
          className="bg-[#1a1a2e] hover:bg-[#2a2a4a] text-gray-400 py-2 px-6 rounded-lg transition-all text-sm"
        >
          📖 Nasıl Oynanır
        </button>
      </div>

      {/* Alt bilgi */}
      <div className="absolute bottom-4 text-gray-600 text-xs text-center">
        <p>Asset-free • Pure Code Graphics • Made with ❤️</p>
      </div>
    </div>
  );
}
