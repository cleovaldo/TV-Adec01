import { Monitor, Heart, HardDrive, PlusCircle, Upload, Megaphone, TrendingUp, CheckCircle } from 'lucide-react';
import { TV_SCREENS, MEDIA_ASSETS } from '../constants';

export default function Dashboard() {
  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <section className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-[#d8e3fb]">Visão Geral do Sistema</h1>
        <p className="text-slate-400 max-w-2xl">Gerencie a comunicação visual do seu santuário digital. Monitorando 24 endpoints ativos em 3 unidades.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="p-6 rounded-xl bg-[#111c2d] flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <Monitor className="text-[#ffb95f] w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Telas Ativas</span>
          </div>
          <div>
            <div className="text-4xl font-black text-[#d8e3fb]">18<span className="text-lg text-slate-400 font-medium">/24</span></div>
            <div className="flex items-center gap-1 text-xs text-[#ffb95f] mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+2 desde o serviço de domingo</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#111c2d] flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <Heart className="text-[#b7c8e1] w-8 h-8 fill-[#b7c8e1]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Saúde da Lista</span>
          </div>
          <div>
            <div className="text-4xl font-black text-[#d8e3fb]">94%</div>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <CheckCircle className="w-4 h-4" />
              <span>Todos os arquivos verificados</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#111c2d] flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start">
            <HardDrive className="text-[#b9c8de] w-8 h-8" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Armazenamento</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#d8e3fb] font-semibold">1.2 TB de 2 TB</span>
              <span className="text-slate-400">60%</span>
            </div>
            <div className="h-1.5 w-full bg-[#2a3548] rounded-full overflow-hidden">
              <div className="h-full bg-[#b7c8e1] rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#2a3548] border border-white/10 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#ffb95f] uppercase tracking-widest mb-1">Ações Rápidas</h3>
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-[#152031] hover:bg-[#2f3a4c] transition-colors text-sm font-medium text-[#d8e3fb] group">
            <PlusCircle className="text-[#b7c8e1] w-4 h-4 group-hover:scale-110 transition-transform" />
            Registrar Nova Tela
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-[#152031] hover:bg-[#2f3a4c] transition-colors text-sm font-medium text-[#d8e3fb] group">
            <Upload className="text-[#b7c8e1] w-4 h-4 group-hover:scale-110 transition-transform" />
            Upload em Massa
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg bg-[#152031] hover:bg-[#2f3a4c] transition-colors text-sm font-medium text-[#d8e3fb] group">
            <Megaphone className="text-[#b7c8e1] w-4 h-4 group-hover:scale-110 transition-transform" />
            Novo Anúncio
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#ffb95f] rounded-full"></span>
            Registro de Telas Ativas
          </h2>
          <div className="bg-[#111c2d] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-white/5">
              <div className="col-span-5">Identidade da Tela</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Conteúdo Atual</div>
              <div className="col-span-2 text-right">Ações</div>
            </div>
            {TV_SCREENS.map((screen) => (
              <div key={screen.id} className="grid grid-cols-12 px-6 py-5 items-center hover:bg-[#2a3548] transition-colors border-b border-white/5 last:border-none">
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-[#040e1f] flex items-center justify-center">
                    <Monitor className={`w-5 h-5 ${screen.status === 'online' ? 'text-[#b7c8e1]' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <div className="font-bold text-[#d8e3fb]">{screen.name}</div>
                    <div className="text-xs text-slate-500">IP: {screen.ip} • {screen.model}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter flex items-center w-fit gap-1 ${
                    screen.status === 'online' ? 'bg-[#ffb95f]/10 text-[#ffb95f]' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${screen.status === 'online' ? 'bg-[#ffb95f]' : 'bg-slate-600'}`}></span>
                    {screen.status}
                  </span>
                </div>
                <div className="col-span-3">
                  <div className="text-sm font-medium">{screen.currentContent}</div>
                  <div className="text-[10px] text-slate-500">{screen.lastSeen}</div>
                </div>
                <div className="col-span-2 text-right">
                  <button className="px-3 py-1.5 rounded bg-[#45556b] text-[#b7c8e1] text-xs font-bold hover:bg-[#b7c8e1] hover:text-[#213145] transition-all">
                    Visualizar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#b7c8e1] rounded-full"></span>
            Mídias Recentes
          </h2>
          <div className="space-y-3">
            {MEDIA_ASSETS.slice(0, 3).map((asset) => (
              <div key={asset.id} className="group relative aspect-video rounded-xl overflow-hidden bg-[#111c2d] cursor-pointer">
                <img src={asset.thumbnail} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e1f]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end">
                  <div>
                    <h4 className="text-sm font-bold text-[#d8e3fb] truncate max-w-[180px]">{asset.title}</h4>
                    <span className="text-[10px] text-slate-400">{asset.quality || 'HD'} • {asset.duration} • {asset.updatedAt}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-[#b7c8e1]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
