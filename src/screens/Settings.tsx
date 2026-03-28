import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Monitor, Shield, Bell, Database, Cloud, Save, RefreshCw, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Configurações Salvas', {
        description: 'As alterações foram aplicadas com sucesso em todo o sistema.'
      });
    }, 1500);
  };

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-[#d8e3fb] tracking-tight mb-2">Configurações do Sistema</h2>
          <p className="text-slate-400 max-w-lg">Gerencie as preferências globais, conectividade de rede e parâmetros de segurança da rede de transmissão ADEC.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-[#ffb95f] text-[#472a00] rounded-md font-bold shadow-lg shadow-[#ffb95f]/10 hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - General & Network */}
        <div className="lg:col-span-2 space-y-8">
          {/* Network Settings */}
          <section className="bg-[#111c2d] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Globe className="text-[#b7c8e1] w-5 h-5" />
              <h3 className="font-bold text-lg">Conectividade e Rede</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Endereço do Servidor Central</label>
                  <input 
                    type="text" 
                    defaultValue="https://server-adec-broadcast.local"
                    className="w-full bg-[#081425] border border-white/5 rounded-lg px-4 py-3 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Porta de Transmissão (UDP/TCP)</label>
                  <input 
                    type="text" 
                    defaultValue="3000"
                    className="w-full bg-[#081425] border border-white/5 rounded-lg px-4 py-3 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f] transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#081425] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Cloud className="text-green-500 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Sincronização em Nuvem</p>
                    <p className="text-[10px] text-slate-500">Backup automático de playlists e configurações</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffb95f]"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Display Preferences */}
          <section className="bg-[#111c2d] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Monitor className="text-[#ffb95f] w-5 h-5" />
              <h3 className="font-bold text-lg">Preferências de Exibição</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Resolução Padrão</label>
                  <select className="w-full bg-[#081425] border border-white/5 rounded-lg px-4 py-3 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f] transition-all appearance-none">
                    <option>Ultra HD (4K) - 3840x2160</option>
                    <option>Full HD (1080p) - 1920x1080</option>
                    <option>HD (720p) - 1280x720</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Transição de Slides (Segundos)</label>
                  <input 
                    type="number" 
                    defaultValue="15"
                    className="w-full bg-[#081425] border border-white/5 rounded-lg px-4 py-3 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f] transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#081425] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#b7c8e1]/10 flex items-center justify-center">
                    <Bell className="text-[#b7c8e1] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Alertas de Emergência</p>
                    <p className="text-[10px] text-slate-500">Sobrepor conteúdo atual com avisos urgentes</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffb95f]"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Security & Info */}
        <div className="space-y-8">
          {/* Security Settings */}
          <section className="bg-[#111c2d] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Shield className="text-red-400 w-5 h-5" />
              <h3 className="font-bold text-lg">Segurança</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Senha de Acesso ao Painel</label>
                <input 
                  type="password" 
                  defaultValue="••••••••••••"
                  className="w-full bg-[#081425] border border-white/5 rounded-lg px-4 py-3 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f] transition-all"
                />
              </div>
              <button className="w-full py-3 bg-[#2a3548] text-[#d8e3fb] font-bold rounded-lg text-xs hover:bg-slate-700 transition-all uppercase tracking-widest">
                Alterar Chave de API
              </button>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Autenticação em 2 Fatores</span>
                  <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">ATIVO</span>
                </div>
              </div>
            </div>
          </section>

          {/* System Info */}
          <section className="bg-[#111c2d] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <Info className="text-[#b7c8e1] w-5 h-5" />
              <h3 className="font-bold text-lg">Sobre o Sistema</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Versão do Software</span>
                <span className="text-xs font-bold text-[#d8e3fb]">v4.2.0-stable</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Última Atualização</span>
                <span className="text-xs font-bold text-[#d8e3fb]">24 Mar 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Licença</span>
                <span className="text-xs font-bold text-[#ffb95f]">Enterprise ADEC</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <button className="w-full flex items-center justify-center gap-2 py-3 text-[#b7c8e1] font-bold text-xs hover:bg-white/5 rounded-lg transition-all">
                  <RefreshCw className="w-3 h-3" />
                  Verificar Atualizações
                </button>
              </div>
            </div>
          </section>

          {/* Database Info */}
          <div className="bg-gradient-to-br from-[#152031] to-[#111c2d] p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#ffb95f]/10 flex items-center justify-center">
                <Database className="text-[#ffb95f] w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">Armazenamento Local</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Cache de Mídia</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-500">12.4 GB / 50 GB</span>
                <span className="text-[#ffb95f]">25%</span>
              </div>
              <div className="h-1.5 w-full bg-[#081425] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffb95f] rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
