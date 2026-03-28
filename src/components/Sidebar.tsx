import { LayoutDashboard, Monitor, PlayCircle, Library, Settings, Radio, HelpCircle, Church, Megaphone, Newspaper, Home, Grid } from 'lucide-react';
import { ScreenType } from '../types';
import { toast } from 'sonner';

interface SidebarProps {
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
  onEnterPublicMode: () => void;
}

export default function Sidebar({ activeScreen, onScreenChange, onEnterPublicMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Bem-vindo', icon: Home },
    { id: 'library', label: 'Galeria', icon: Grid },
    { id: 'studio', label: 'Comunicados', icon: Megaphone },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'screens', label: 'Telas', icon: Monitor },
    { id: 'playlists', label: 'Playlists', icon: PlayCircle },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  const handleGoLive = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Iniciando transmissão ao vivo...',
        success: 'Você está AO VIVO!',
        error: 'Falha ao iniciar transmissão.',
      }
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-full z-40 bg-[#081425] w-64 flex flex-col border-r border-white/5 font-['Plus_Jakarta_Sans'] text-sm font-medium">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#ffb95f] flex items-center justify-center">
          <Church className="text-[#472a00] w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-[#ffb95f] leading-tight">TV Indoor ADEC</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">Sanctuary Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id as ScreenType)}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 rounded-md ${
                isActive
                  ? 'bg-[#2a3548] text-[#ffb95f] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#111c2d]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto space-y-2">
        <button 
          onClick={() => {
            window.location.href = '/news';
          }}
          className="w-full py-3 rounded-md border border-[#ffb95f]/30 text-[#ffb95f] font-bold flex items-center justify-center gap-2 hover:bg-[#ffb95f]/10 transition-all active:scale-95"
        >
          <Newspaper className="w-4 h-4" />
          Modo Mundo Cristão
        </button>
        <button 
          onClick={() => {
            window.location.href = '/display';
          }}
          className="w-full py-3 rounded-md bg-[#2a3548] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#36445d] transition-all active:scale-95"
        >
          <Monitor className="w-4 h-4" />
          Modo Playlist
        </button>
        <button 
          onClick={handleGoLive}
          className="w-full py-3 rounded-md bg-gradient-to-r from-[#b7c8e1] to-[#45556b] text-[#213145] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95"
        >
          <Radio className="w-4 h-4" />
          Transmitir Ao Vivo
        </button>
        <div className="mt-4 pt-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-100 transition-colors w-full text-left">
            <HelpCircle className="w-5 h-5" />
            <span>Suporte</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
