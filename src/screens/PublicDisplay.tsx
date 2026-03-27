import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, MapPin, Radio, Heart, Users, ChevronRight, ChevronLeft, Info, Monitor, CheckCircle2, AlertCircle } from 'lucide-react';
import { TV_SCREENS } from '../constants';
import { TVScreen, PlaylistItem } from '../types';

interface PublicDisplayProps {
  onExit: () => void;
}

export default function PublicDisplay({ onExit }: PublicDisplayProps) {
  const [screenId, setScreenId] = useState<string | null>(localStorage.getItem('display_screen_id'));
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [availableScreens, setAvailableScreens] = useState<TVScreen[]>(TV_SCREENS);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load screens from localStorage to have the latest list
  useEffect(() => {
    const saved = localStorage.getItem('tv_screens');
    if (saved) {
      try {
        setAvailableScreens(JSON.parse(saved));
      } catch (e) {
        setAvailableScreens(TV_SCREENS);
      }
    }
  }, []);

  // Poll for content if screenId is set
  useEffect(() => {
    if (!screenId) return;

    const poll = async () => {
      try {
        const response = await fetch(`/api/screens/${screenId}/content`);
        if (response.ok) {
          const data = await response.json();
          if (data.timestamp > lastTimestamp) {
            setPlaylist(data.playlist);
            setLastTimestamp(data.timestamp);
            setCurrentIndex(0);
          }
        }
      } catch (e) {
        console.error('Polling error:', e);
      }
    };

    const interval = setInterval(poll, 3000);
    poll(); // Initial check
    return () => clearInterval(interval);
  }, [screenId, lastTimestamp]);

  // Auto-advance playlist
  useEffect(() => {
    if (playlist.length <= 1) return;

    const currentItem = playlist[currentIndex];
    if (currentItem?.type === 'video') return; // Video handles its own end

    const duration = (currentItem?.duration || 10) * 1000;
    const timer = setTimeout(() => {
      nextItem();
    }, duration);

    return () => clearTimeout(timer);
  }, [playlist, currentIndex]);

  const nextItem = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
      setIsTransitioning(false);
    }, 500);
  };

  const selectScreen = (id: string) => {
    setScreenId(id);
    localStorage.setItem('display_screen_id', id);
  };

  if (!screenId) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#081425] text-white flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="w-20 h-20 bg-[#ffb95f]/10 rounded-3xl mx-auto flex items-center justify-center border border-[#ffb95f]/20">
            <Monitor className="w-10 h-10 text-[#ffb95f]" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Configurar Tela</h1>
            <p className="text-slate-400">Selecione qual identidade esta tela deve assumir para receber transmissões.</p>
          </div>
          
          <div className="space-y-3 mt-8">
            {availableScreens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => selectScreen(screen.id)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#ffb95f]/50 transition-all flex items-center justify-between group"
              >
                <div className="text-left">
                  <p className="font-bold text-white group-hover:text-[#ffb95f] transition-colors">{screen.name}</p>
                  <p className="text-xs text-slate-500">{screen.model} • {screen.ip}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-[#ffb95f]" />
              </button>
            ))}
          </div>

          <button 
            onClick={onExit}
            className="text-slate-500 hover:text-white text-sm font-bold uppercase tracking-widest pt-4"
          >
            Voltar ao Painel
          </button>
        </div>
      </div>
    );
  }

  const currentItem = playlist[currentIndex];

  const renderContent = () => {
    if (playlist.length === 0) {
      return (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-20"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
            <Radio className="w-12 h-12 text-slate-600 animate-pulse" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4">Aguardando Transmissão</h2>
          <p className="text-xl text-slate-400 max-w-lg mx-auto">
            Esta tela está conectada como <span className="text-[#ffb95f] font-bold">{availableScreens.find(s => s.id === screenId)?.name}</span>. 
            Publique uma lista de reprodução para começar.
          </p>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id + currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {currentItem.type === 'video' ? (
            <video
              ref={videoRef}
              src={currentItem.thumbnail} // In a real app, this would be the video URL
              autoPlay
              muted
              onEnded={nextItem}
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src={currentItem.thumbnail} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-32 left-20 right-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-6xl font-black text-white tracking-tighter mb-2 uppercase drop-shadow-2xl">
                {currentItem.title}
              </h2>
              <p className="text-2xl text-white/80 font-medium drop-shadow-lg">
                {currentItem.type === 'video' ? 'Vídeo em Exibição' : 'Destaque'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Controls Overlay (Hidden in real use) */}
      <div className="absolute top-8 left-8 z-[110] flex items-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex bg-black/50 backdrop-blur-xl p-1 rounded-full border border-white/10">
          <button onClick={() => {
            localStorage.removeItem('display_screen_id');
            setScreenId(null);
          }} className="p-2 rounded-full text-white hover:bg-white/10 flex items-center gap-2 px-4">
            <Monitor className="w-4 h-4" />
            <span className="text-xs font-bold">Trocar Tela</span>
          </button>
        </div>
        <button 
          onClick={onExit}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Footer Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent z-[105] flex items-center justify-between px-20">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-4xl font-black tracking-tighter leading-none">{time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-xs font-bold text-[#ffb95f] uppercase tracking-widest mt-1">Horário Local</span>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none">24°C</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Céu Limpo</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Status da Tela</p>
            <p className="text-sm font-bold text-white">
              {screenId ? availableScreens.find(s => s.id === screenId)?.name : 'Não Identificada'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#ffb95f]/30 flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-[#ffb95f] rounded-full border-t-transparent animate-spin"></div>
            <Radio className="w-5 h-5 text-[#ffb95f]" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {playlist.length > 0 && (
        <div 
          className="absolute bottom-0 left-0 h-1.5 bg-[#ffb95f] z-[110] transition-all ease-linear" 
          style={{ 
            width: '100%', 
            animation: currentItem?.type === 'video' ? 'none' : `progress-fast ${(currentItem?.duration || 10)}s infinite linear` 
          }} 
          key={currentIndex}
        ></div>
      )}
    </div>
  );
}
