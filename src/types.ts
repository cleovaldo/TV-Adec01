export type ScreenType = 'dashboard' | 'screens' | 'playlists' | 'library' | 'settings' | 'studio' | 'news';

export interface MediaAsset {
  id: string;
  title: string;
  type: 'video' | 'image' | 'announcement';
  thumbnail: string;
  duration?: string;
  quality?: string;
  updatedAt: string;
}

export interface PlaylistItem {
  id: string;
  assetId: string;
  title: string;
  duration: string;
  type: 'video' | 'image';
  thumbnail: string;
  isActive?: boolean;
}

export interface TVScreen {
  id: string;
  name: string;
  ip: string;
  model: string;
  status: 'online' | 'offline' | 'waiting';
  currentContent: string;
  lastSeen: string;
  latency: number; // in ms
  cpuUsage: number; // percentage
  gpuUsage: number; // percentage
  temperature: number; // in Celsius
  isPowerOn: boolean;
}
