import React, { useState, useEffect } from 'react';
import PublicDisplay from './PublicDisplay';
import News from './News';
import { X, Monitor, Newspaper, PlayCircle } from 'lucide-react';

interface DisplayModeProps {
  isNews?: boolean;
  onExit: () => void;
}

export default function DisplayMode({ isNews: initialIsNews = false, onExit }: DisplayModeProps) {
  const [mode, setMode] = useState<'playlist' | 'news'>(initialIsNews ? 'news' : 'playlist');
  const [showSelector, setShowSelector] = useState(false);

  // Auto-hide selector after some time
  useEffect(() => {
    if (showSelector) {
      const timer = setTimeout(() => setShowSelector(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSelector]);

  return (
    <div className="fixed inset-0 z-[200] bg-black group">
      {/* Hidden trigger for selector */}
      <div 
        className="absolute top-0 left-0 right-0 h-20 z-[220] cursor-pointer"
        onMouseMove={() => setShowSelector(true)}
        onClick={() => setShowSelector(true)}
      />

      {/* Mode Selector Overlay */}
      {showSelector && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[230] flex items-center gap-4 bg-[#081425]/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => setMode('playlist')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'playlist' ? 'bg-[#ffb95f] text-[#472a00]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <PlayCircle className="w-5 h-5" />
            Playlist
          </button>
          <button 
            onClick={() => setMode('news')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${mode === 'news' ? 'bg-[#ffb95f] text-[#472a00]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Newspaper className="w-5 h-5" />
            Mundo Cristão
          </button>
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button 
            onClick={onExit}
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Render selected mode */}
      <div className="w-full h-full">
        {mode === 'playlist' ? (
          <PublicDisplay onExit={onExit} />
        ) : (
          <div className="w-full h-full relative">
            <News fullScreen />
            {/* Overlay exit button for news mode since News component doesn't have one */}
            <button 
              onClick={onExit}
              className="absolute top-8 right-8 z-[210] w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
