import { useState } from 'react';
import { Toaster } from 'sonner';
import { ScreenType } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './screens/Dashboard';
import MediaLibrary from './screens/MediaLibrary';
import ContentStudio from './screens/ContentStudio';
import ScreensManagement from './screens/ScreensManagement';
import PublicDisplay from './screens/PublicDisplay';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [isPublicMode, setIsPublicMode] = useState(false);

  if (isPublicMode) {
    return <PublicDisplay onExit={() => setIsPublicMode(false)} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
      case 'playlists':
        return <MediaLibrary activeScreen={activeScreen} />;
      case 'studio':
        return <ContentStudio onPreview={() => setIsPublicMode(true)} />;
      case 'screens':
        return <ScreensManagement />;
      default:
        return <Dashboard />;
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
      <TopBar />
      <main className="ml-64 pt-16 h-screen overflow-hidden">
        {renderScreen()}
      </main>
    </div>
  );
}
