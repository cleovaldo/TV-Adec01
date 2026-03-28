import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { ScreenType } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './screens/Dashboard';
import MediaLibrary from './screens/MediaLibrary';
import ContentStudio from './screens/ContentStudio';
import ScreensManagement from './screens/ScreensManagement';
import DisplayMode from './screens/DisplayMode';
import Settings from './screens/Settings';
import News from './screens/News';
import Login from './screens/Login';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [user, setUser] = useState<any>(null);
  const [isPublicMode, setIsPublicMode] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    
    const isDisplay = path.includes('/display') || search.includes('mode=display');
    const isNews = path.includes('/news') || search.includes('mode=news');
    
    return isDisplay || isNews;
  });

  const handleLogin = (userData: any) => {
    setUser(userData);
    if (userData.role === 'screen' && userData.defaultPath) {
      window.history.pushState({}, '', userData.defaultPath);
      setIsPublicMode(true);
    }
  };

  if (!user && !isPublicMode) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster position="top-right" theme="dark" />
      </>
    );
  }

  if (isPublicMode) {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const isNewsMode = path.includes('/news') || search.includes('mode=news');
    
    return <DisplayMode isNews={isNewsMode} onExit={() => setIsPublicMode(false)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveScreen} />;
      case 'library':
      case 'playlists':
        return <MediaLibrary activeScreen={activeScreen} />;
      case 'studio':
        return <ContentStudio onPreview={() => setIsPublicMode(true)} />;
      case 'screens':
        return <ScreensManagement />;
      case 'settings':
        return <Settings />;
      case 'news':
        return <News />;
      default:
        return <Dashboard onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#081425] text-[#d8e3fb] font-['Plus_Jakarta_Sans']">
      <Toaster position="top-right" theme="dark" />
      <Sidebar 
        activeScreen={activeScreen} 
        onScreenChange={setActiveScreen} 
        onEnterPublicMode={() => setIsPublicMode(true)}
      />
      <TopBar user={user} />
      <main className="ml-64 pt-16 h-screen overflow-hidden">
        {renderScreen()}
      </main>
    </div>
  );
}
