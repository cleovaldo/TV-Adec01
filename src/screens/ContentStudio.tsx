import { Edit3, Palette, Upload, CheckCircle, ArrowRight, Tv, Share2, Calendar, Users, Info, TrendingUp, Plus, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GoogleGenAI, Type } from "@google/genai";

interface ContentStudioProps {
  onPreview: () => void;
}

export default function ContentStudio({ onPreview }: ContentStudioProps) {
  const [title, setTitle] = useState('Community Worship Night');
  const [content, setContent] = useState('Join us this Friday at 7 PM for an evening of prayer, music, and community fellowship in the main sanctuary.');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(false);

  const [activeSubTab, setActiveSubTab] = useState<'announcements' | 'news'>('announcements');

  useEffect(() => {
    const savedDraft = localStorage.getItem('announcement_draft');
    if (savedDraft) {
      try {
        const { title: savedTitle, content: savedContent } = JSON.parse(savedDraft);
        setTitle(savedTitle);
        setContent(savedContent);
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, []);

  // Auto-save draft as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('announcement_draft', JSON.stringify({ title, content }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content]);

  const handleSaveDraft = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('announcement_draft', JSON.stringify({ title, content }));
      setIsSaving(false);
      toast.success('Rascunho salvo com sucesso!', {
        description: 'Suas alterações foram armazenadas localmente.',
      });
    }, 800);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('announcement_draft', JSON.stringify({ title, content }));
      setIsPublishing(false);
      toast.success('Publicado com sucesso!', {
        description: 'O anúncio agora está visível nas TVs.',
      });
    }, 1200);
  };

  const handleCreateNew = () => {
    setTitle('');
    setContent('');
    toast.info('Novo rascunho iniciado', {
      description: 'Campos limpos para nova criação.',
    });
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error('Por favor, descreva o que você deseja gerar.');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const systemInstruction = activeSubTab === 'announcements' 
        ? "Você é um redator criativo para uma rede de TVs de avisos comunitários (ADEC). Crie um anúncio impactante e conciso."
        : "Você é um jornalista para um feed de notícias de rodapé (scrolling news). Crie uma notícia curta e objetiva.";

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Gere um ${activeSubTab === 'announcements' ? 'anúncio' : 'item de notícia'} baseado no seguinte tema: ${aiPrompt}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Um título curto e chamativo (máx 40 caracteres)"
              },
              content: {
                type: Type.STRING,
                description: activeSubTab === 'announcements' 
                  ? "O corpo do anúncio (máx 150 caracteres)" 
                  : "A notícia para o feed (máx 100 caracteres)"
              }
            },
            required: ["title", "content"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setTitle(result.title);
      setContent(result.content);
      setShowAIPanel(false);
      setAiPrompt('');
      toast.success('Conteúdo gerado com sucesso!', {
        icon: <Sparkles className="w-4 h-4 text-yellow-500" />
      });
    } catch (error) {
      console.error('AI Generation Error:', error);
      toast.error('Erro ao gerar conteúdo com IA. Verifique sua conexão e chave de API.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[#d8e3fb] tracking-tight mb-2">Estúdio de Conteúdo</h2>
            <p className="text-[#b7c8e1]/70 max-w-lg">
              {activeSubTab === 'announcements' 
                ? 'Crie e gerencie slides de anúncios em alta definição para o sistema de exibição do santuário.'
                : 'Configure o feed de notícias em tempo real para as telas laterais e recepção.'}
            </p>
          </div>
          <div className="flex gap-3 bg-[#111c2d] p-1 rounded-lg">
            <button 
              onClick={() => setActiveSubTab('announcements')}
              className={`px-6 py-2 rounded-md text-sm font-semibold shadow-sm transition-all ${activeSubTab === 'announcements' ? 'bg-[#2a3548] text-[#ffb95f]' : 'text-slate-400 hover:text-[#d8e3fb]'}`}
            >
              Anúncios
            </button>
            <button 
              onClick={() => setActiveSubTab('news')}
              className={`px-6 py-2 rounded-md text-sm font-semibold shadow-sm transition-all ${activeSubTab === 'news' ? 'bg-[#2a3548] text-[#ffb95f]' : 'text-slate-400 hover:text-[#d8e3fb]'}`}
            >
              Feed de Notícias
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <section className="bg-[#111c2d] rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-[#ffb95f]">
                  <Edit3 className="w-5 h-5" />
                  <h3 className="font-bold text-lg uppercase tracking-wider">
                    {activeSubTab === 'announcements' ? 'Detalhes do Slide' : 'Configuração do Feed'}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowAIPanel(!showAIPanel)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${showAIPanel ? 'bg-[#ffb95f] text-[#472a00]' : 'bg-[#2a3548] text-[#ffb95f] hover:bg-[#36445d]'}`}
                >
                  <Sparkles className="w-3 h-3" />
                  Assistente de IA
                </button>
              </div>

              {showAIPanel && (
                <div className="mb-8 p-6 bg-[#081425] rounded-xl border border-[#ffb95f]/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Wand2 className="w-4 h-4 text-[#ffb95f]" />
                    <h4 className="text-xs font-bold text-[#d8e3fb] uppercase tracking-wider">O que você deseja anunciar?</h4>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      placeholder="Ex: Noite de pizza para jovens no sábado às 19h..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerateAI()}
                      className="flex-1 bg-[#111c2d] border border-white/5 rounded-lg px-4 py-2 text-sm text-[#d8e3fb] outline-none focus:ring-1 focus:ring-[#ffb95f]"
                    />
                    <button 
                      onClick={handleGenerateAI}
                      disabled={isGeneratingAI}
                      className="px-6 py-2 bg-[#ffb95f] text-[#472a00] rounded-lg font-bold text-xs hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isGeneratingAI ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Gerar
                    </button>
                  </div>
                  <p className="mt-3 text-[10px] text-slate-500 italic">A IA criará um título e conteúdo otimizados para as telas.</p>
                </div>
              )}

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1] mb-2">
                      {activeSubTab === 'announcements' ? 'Título do Anúncio' : 'Título da Notícia'}
                    </label>
                    <input
                      type="text"
                      placeholder={activeSubTab === 'announcements' ? "Ex: Noite de Louvor" : "Ex: Últimas Notícias"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#2a3548] border border-white/10 rounded-md px-4 py-3 text-[#d8e3fb] focus:ring-1 focus:ring-[#b7c8e1] outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1] mb-2">
                      {activeSubTab === 'announcements' ? 'Conteúdo do Slide' : 'Texto do Feed (Scrolling)'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={activeSubTab === 'announcements' ? "Descreva o evento..." : "Digite as notícias que irão rolar no rodapé..."}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-[#2a3548] border border-white/10 rounded-md px-4 py-3 text-[#d8e3fb] focus:ring-1 focus:ring-[#b7c8e1] outline-none transition-all"
                    />
                  </div>
                  {activeSubTab === 'news' && (
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1] mb-2">Velocidade do Scroll</label>
                      <select className="w-full bg-[#2a3548] border border-white/10 rounded-md px-4 py-3 text-[#d8e3fb] outline-none">
                        <option>Lento</option>
                        <option selected>Normal</option>
                        <option>Rápido</option>
                      </select>
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1] mb-2">Duração (Segundos)</label>
                    <div className="flex items-center gap-3">
                      <input type="number" defaultValue={15} className="w-full bg-[#2a3548] border border-white/10 rounded-md px-4 py-3 text-[#d8e3fb] focus:ring-1 focus:ring-[#b7c8e1] outline-none" />
                      <span className="text-slate-500 text-xs font-medium">sec</span>
                    </div>
                  </div>
                </div>
              </form>
            </section>

            <section className="bg-[#111c2d] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-[#ffb95f]">
                <Palette className="w-5 h-5" />
                <h3 className="font-bold text-lg uppercase tracking-wider">Estilo Visual</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1] mb-3">Imagem de Fundo</label>
                  <div className="grid grid-cols-4 gap-4">
                    <button className="relative aspect-video rounded-md overflow-hidden ring-2 ring-[#ffb95f] group">
                      <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <CheckCircle className="text-[#ffb95f] w-6 h-6" />
                      </div>
                    </button>
                    {[1, 2].map((i) => (
                      <button key={i} className="relative aspect-video rounded-md overflow-hidden hover:opacity-100 transition-opacity">
                        <img src={`https://picsum.photos/seed/bg${i}/800/450`} className="w-full h-full object-cover opacity-50" />
                      </button>
                    ))}
                    <button className="aspect-video rounded-md bg-[#2a3548] flex flex-col items-center justify-center gap-1 border border-dashed border-white/10 text-slate-500 hover:text-[#b7c8e1] transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-[10px] font-bold">PERSONALIZAR</span>
                    </button>
                  </div>
                </div>
                <div className="pt-4 flex justify-end gap-4">
                  <button 
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="px-8 py-3 text-[#d8e3fb] font-semibold text-sm hover:bg-[#1f2a3c] transition-colors rounded-md disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Salvar Rascunho
                  </button>
                  <button 
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="px-10 py-3 bg-[#ffb95f] text-[#472a00] font-bold text-sm uppercase tracking-widest rounded-md shadow-lg shadow-[#ffb95f]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isPublishing && <Loader2 className="w-4 h-4 animate-spin" />}
                    Publicar na TV
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ffb95f] rounded-full animate-pulse"></span>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#b7c8e1]">Prévia da TV ao Vivo</h4>
                </div>
                <button onClick={onPreview} className="text-[10px] text-[#ffb95f] font-bold hover:underline uppercase tracking-widest">Ver em Tela Cheia</button>
              </div>

              <div className="relative aspect-video w-full bg-slate-950 rounded-lg overflow-hidden shadow-2xl ring-8 ring-[#111c2d]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800')" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h1 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-lg">{title}</h1>
                    <p className="text-sm text-slate-200 max-w-sm font-medium leading-relaxed opacity-90">{content}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/10 backdrop-blur flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-400 font-bold uppercase">Time & Location</p>
                          <p className="text-[10px] text-white font-semibold">Friday, 7:00 PM • Main Sanctuary</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-slate-400 font-bold uppercase">Streaming Live</p>
                        <p className="text-[10px] text-[#ffb95f] font-bold">gracecommunity.org/live</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#111c2d] p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">Prioridade de Rotação</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#d8e3fb]">Alta</span>
                    <TrendingUp className="text-[#ffb95f] w-5 h-5" />
                  </div>
                </div>
                <div className="bg-[#111c2d] p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">Alcance Diário Est.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#d8e3fb]">2,450</span>
                    <Users className="text-[#b7c8e1] w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button 
                  onClick={handlePublish}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#2a3548] hover:bg-[#1f2a3c] transition-colors rounded-xl group"
                >
                  <div className="flex items-center gap-4">
                    <Tv className="text-[#b7c8e1] group-hover:scale-110 transition-transform w-5 h-5" />
                    <span className="text-sm font-semibold">Transmitir para Telas</span>
                  </div>
                  <ArrowRight className="text-slate-500 w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 bg-[#2a3548] hover:bg-[#1f2a3c] transition-colors rounded-xl group">
                  <div className="flex items-center gap-4">
                    <Share2 className="text-[#b7c8e1] group-hover:scale-110 transition-transform w-5 h-5" />
                    <span className="text-sm font-semibold">Exportar para Redes</span>
                  </div>
                  <ArrowRight className="text-slate-500 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Anúncios Recentes</h3>
            <button className="text-sm text-[#ffb95f] font-semibold hover:underline">Ver Histórico</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#111c2d] group cursor-pointer hover:bg-[#1f2a3c] transition-all p-4 rounded-lg">
                <div className="aspect-video mb-4 rounded overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/recent${i}/800/450`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit3 className="text-white w-6 h-6" />
                  </div>
                </div>
                <h5 className="font-bold text-sm mb-1">Recent Announcement {i}</h5>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Ativo • Expira em {i * 2} dias</p>
              </div>
            ))}
            <div 
              onClick={handleCreateNew}
              className="border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-4 rounded-lg hover:border-[#ffb95f] transition-colors cursor-pointer text-slate-500 hover:text-[#ffb95f] group"
            >
              <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Create New</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
