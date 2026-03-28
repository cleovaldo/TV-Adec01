import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Globe, ArrowRight, Info, Heart, BookOpen, MessageSquare, Loader2 } from 'lucide-react';

interface NewsProps {
  fullScreen?: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function News({ fullScreen = false }: NewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const date = new Date();
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  if (isLoading && news.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-[#fdfdfc]">
        <Loader2 className="w-8 h-8 animate-spin text-[#ffb95f]" />
      </div>
    );
  }

  // Fallback to static news if none published yet
  const displayNews = news.length > 0 ? news : [
    {
      id: '1',
      title: 'Missão na África alcança nova aldeia no interior da Tanzânia',
      content: 'Após três meses de preparação, a equipe missionária estabelece o primeiro centro comunitário e poço artesiano.',
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Conferência Nacional de Pastores anunciada para Novembro',
      content: 'O evento reunirá mais de 500 líderes em São Paulo para discutir o futuro da igreja digital.',
      date: new Date().toISOString()
    }
  ];

  const mainStory = displayNews[0];
  const sideStories = displayNews.slice(1, 3);
  const bottomStories = displayNews.slice(3, 6);

  return (
    <div className={`p-8 h-full overflow-y-auto custom-scrollbar bg-[#fdfdfc] text-[#1a1a1a] font-['Inter'] ${fullScreen ? 'pb-24' : ''}`}>
      {/* Header Section */}
      <header className="flex justify-between items-end mb-12 border-b border-black/5 pb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Atualizações Globais</p>
          <h1 className="text-7xl font-black tracking-tighter text-[#081425]">Mundo Cristão</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500 capitalize border-b-2 border-[#ffb95f] pb-1 inline-block">
            {formattedDate}
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8 mb-12">
        {/* Main Feature Story */}
        <motion.div 
          key={mainStory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl group"
        >
          <img 
            src="https://images.unsplash.com/photo-1523733593134-a15d80966249?auto=format&fit=crop&q=80&w=1200" 
            alt="Feature Story"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
            <span className="bg-[#ffb95f] text-[#472a00] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-6">
              Destaque
            </span>
            <h2 className="text-5xl font-black text-white leading-tight mb-6 max-w-2xl">
              {mainStory.title}
            </h2>
            <p className="text-lg text-white/80 max-w-xl leading-relaxed font-medium">
              {mainStory.content}
            </p>
          </div>
        </motion.div>

        {/* Sidebar News Items */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {sideStories.map((story, idx) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (idx + 1) }}
              className="bg-[#f5f5f0] p-8 rounded-3xl border border-black/5"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Atualização</p>
              <h3 className="text-2xl font-black leading-snug mb-4 text-[#081425]">
                {story.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {story.content}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffb95f]">
                <Calendar className="w-4 h-4" />
                <span>{new Date(story.date).toLocaleDateString('pt-BR')}</span>
              </div>
            </motion.div>
          ))}

          {sideStories.length < 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800" 
                alt="Worship Workshop"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
                <h3 className="text-xl font-black text-white leading-tight mb-2">
                  Workshop de Adoração Profética: Inscrições Abertas
                </h3>
                <p className="text-xs text-white/60 uppercase tracking-widest font-bold">Vagas Limitadas</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {bottomStories.length > 0 ? bottomStories.map((story, idx) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#081425] flex items-center justify-center shrink-0">
              <BookOpen className="text-[#ffb95f] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">{story.title}</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed truncate max-w-[200px]">{story.content}</p>
            </div>
          </motion.div>
        )) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#081425] flex items-center justify-center shrink-0">
                <BookOpen className="text-[#ffb95f] w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Novo curriculum de Escola Bíblica é lançado</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Material focado em nova geração de líderes.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ffb95f]/10 flex items-center justify-center shrink-0">
                <Heart className="text-[#ffb95f] w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Campanha do Agasalho atinge meta histórica</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Mais de 5.000 peças foram arrecadadas.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-black/5 flex gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Globe className="text-slate-500 w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Relatório Global de Tradução da Bíblia</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">20 novas línguas receberam o Novo Testamento.</p>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Footer Ticker */}
      <div className={`fixed bottom-0 ${fullScreen ? 'left-0' : 'left-64'} right-0 bg-[#081425] h-16 flex items-center overflow-hidden border-t border-white/5`}>
        <div className="bg-[#ffb95f] h-full px-6 flex items-center gap-2 shrink-0 z-10">
          <MessageSquare className="w-4 h-4 text-[#472a00]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#472a00]">Destaques</span>
        </div>
        <div className="flex whitespace-nowrap animate-marquee py-2">
          {displayNews.map((story) => (
            <div key={story.id} className="flex items-center gap-8 px-8">
              <span className="text-xs font-bold text-white/80">
                {story.title}: {story.content}
              </span>
              <div className="w-1 h-1 rounded-full bg-[#ffb95f]"></div>
            </div>
          ))}
          {/* Duplicate for seamless loop if items are few */}
          {displayNews.length < 5 && displayNews.map((story) => (
            <div key={`dup-${story.id}`} className="flex items-center gap-8 px-8">
              <span className="text-xs font-bold text-white/80">
                {story.title}: {story.content}
              </span>
              <div className="w-1 h-1 rounded-full bg-[#ffb95f]"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
