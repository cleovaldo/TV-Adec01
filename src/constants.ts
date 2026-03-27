import { MediaAsset, PlaylistItem, TVScreen } from './types';

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: '1',
    title: 'Sunday Morning Opener - Spring 2024',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCipM3vAzPUZU_86JLOsQ55U2hwIOXKbvYQxyj3v_f7vIuDsMObUk66zJy-vSpLKtNQb__QD0SWZ_Ljn60MQ3wbNpHNxL9iXug846ELAh3vq3KXpLhnjdnrEJbbiqcSkszS199ybzW_X5kXECTWmMZrk7EQv2TBlcAtS2902GIKAFIJA_EI-g0zPsS4i5UAKfZBWOiI6545wVYGX1OjymxQfGjiERqScCtn9ywJcbZmjmRQhp6VxYgu9LLT-txxtW_lJ7VLtWXk3M8',
    duration: '04:15',
    quality: '4K',
    updatedAt: '2 dias',
  },
  {
    id: '2',
    title: 'Worship Background - Deep Blue Glow',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1A6HEW-J0TiksgvkUePMyOD3C3jKZkWsqKZTfTB4EYtfn6Bh0aX70jsJQ6wv74mO5M8VY4QxA0fZXG8d28oU89jbmqV3DSATUo25Cd1esMumlNVjSHZDzewYdHSJkQ4gKmyeGvFIfhXhnU1EdXMxZkXdnflw8KoRqFx8E5i1da6Bh-fYxWdVzUr3eKX2emLeJMYGp0Mp0tQCCmw7rz-q_Ct8tGAxBdn501aDofkXxb7N8wZcaHMwF09H1WKOz2VdW2sxpTzAqfuA',
    duration: '12:30',
    quality: 'HD',
    updatedAt: '5 dias',
  },
  {
    id: '3',
    title: 'Announcement: Youth Retreat 2024',
    type: 'announcement',
    thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
    duration: '15s',
    updatedAt: '1 semana',
  },
  {
    id: '4',
    title: 'Sermon Series: The Quiet Life',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU7HnzCrQdBejE0EFG7XawHtEUDzqK-1eFV5M4KVsWXLB6yjKY7_XTn54KoKDV8FJoSXRnkQ2idN_rXrgu-jQR-CC5MGPDLQ9pQbJGFyU2Wlb-LYMvSgZ0J2e6uINvrQpTTR6KcRiOG6DKogtig49tffNvwvMQFGp6uWQJDS7SsnweZvddvNLhPkrhx0Ph0xz0-31hvO4IKh73USE9jjIgdNxX_kVEo1T_2PjsZE9_CO8c3vdvvoD7DlBaJxP54KiwaCMyKT57bTw',
    duration: '08:00',
    updatedAt: '2 semanas',
  },
  {
    id: '5',
    title: 'Church Picnic Flyer',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1504150559654-7255e7c51455?auto=format&fit=crop&q=80&w=800',
    duration: 'Estático',
    updatedAt: '3 dias',
  },
  {
    id: '6',
    title: 'Weekly Bulletin - March',
    type: 'announcement',
    thumbnail: 'https://images.unsplash.com/photo-1517673132405-a56a62b18acc?auto=format&fit=crop&q=80&w=800',
    duration: '30s',
    updatedAt: 'Ontem',
  }
];

export const PLAYLIST_ITEMS: PlaylistItem[] = [
  {
    id: 'p1',
    assetId: '1',
    title: 'Sunday Morning Opener',
    duration: '04:15',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCipM3vAzPUZU_86JLOsQ55U2hwIOXKbvYQxyj3v_f7vIuDsMObUk66zJy-vSpLKtNQb__QD0SWZ_Ljn60MQ3wbNpHNxL9iXug846ELAh3vq3KXpLhnjdnrEJbbiqcSkszS199ybzW_X5kXECTWmMZrk7EQv2TBlcAtS2902GIKAFIJA_EI-g0zPsS4i5UAKfZBWOiI6545wVYGX1OjymxQfGjiERqScCtn9ywJcbZmjmRQhp6VxYgu9LLT-txxtW_lJ7VLtWXk3M8',
  },
  {
    id: 'p2',
    assetId: '3',
    title: 'Welcome Announcement',
    duration: '00:15',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p3',
    assetId: '2',
    title: 'Worship BG: Deep Blue',
    duration: '12:30',
    type: 'video',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1A6HEW-J0TiksgvkUePMyOD3C3jKZkWsqKZTfTB4EYtfn6Bh0aX70jsJQ6wv74mO5M8VY4QxA0fZXG8d28oU89jbmqV3DSATUo25Cd1esMumlNVjSHZDzewYdHSJkQ4gKmyeGvFIfhXhnU1EdXMxZkXdnflw8KoRqFx8E5i1da6Bh-fYxWdVzUr3eKX2emLeJMYGp0Mp0tQCCmw7rz-q_Ct8tGAxBdn501aDofkXxb7N8wZcaHMwF09H1WKOz2VdW2sxpTzAqfuA',
    isActive: true,
  }
];

export const TV_SCREENS: TVScreen[] = [
  {
    id: 's1',
    name: 'Sanctuary Main East',
    ip: '192.168.1.44',
    model: 'Samsung Q70',
    status: 'online',
    currentContent: 'Sunday Sermon Series',
    lastSeen: '12:45 PM',
    latency: 12,
    cpuUsage: 45,
    gpuUsage: 32,
    temperature: 42,
    isPowerOn: true,
  },
  {
    id: 's2',
    name: 'Lobby Welcome Wall',
    ip: '192.168.1.45',
    model: 'LG Video Wall',
    status: 'online',
    currentContent: 'Connect Groups Fall',
    lastSeen: '05:00 PM',
    latency: 24,
    cpuUsage: 78,
    gpuUsage: 65,
    temperature: 54,
    isPowerOn: true,
  },
  {
    id: 's3',
    name: 'Kids Wing Hub',
    ip: '192.168.1.52',
    model: 'Sony Bravia',
    status: 'offline',
    currentContent: 'Sem transmissão ativa',
    lastSeen: '2h ago',
    latency: 0,
    cpuUsage: 0,
    gpuUsage: 0,
    temperature: 22,
    isPowerOn: false,
  }
];
