// Utility functions for admin dashboard

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export const exportToJSON = (data: any, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateJSON = (jsonString: string): { valid: boolean; error?: string; data?: any } => {
  try {
    const data = JSON.parse(jsonString);
    // Basic structure validation
    if (typeof data !== 'object') {
      return { valid: false, error: 'JSON must be an object' };
    }
    return { valid: true, data };
  } catch (e) {
    return { valid: false, error: `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}` };
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getShortcut = (isMac: boolean, key: string): string => {
  const mod = isMac ? 'Cmd' : 'Ctrl';
  return `${mod} + ${key}`;
};

export const duplicateItem = (item: any): any => {
  const { id, ...rest } = item;
  return {
    ...rest,
    id: `${id}-copy-${Date.now()}`,
    title: `${rest.title} (Copy)`,
  };
};

export const reorderItems = (items: any[], fromIndex: number, toIndex: number): any[] => {
  const result = Array.from(items);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result.map((item, idx) => ({ ...item, orderIndex: idx }));
};

export const calculateStats = (items: any[]) => {
  const total = items.length;
  const published = items.filter((i: any) => i.published).length;
  const favorites = items.filter((i: any) => i.favorite).length;
  const totalViews = items.reduce((sum: number, i: any) => sum + (i.views || 0), 0);
  const totalLikes = items.reduce((sum: number, i: any) => sum + (i.likes || 0), 0);
  return { total, published, favorites, totalViews, totalLikes };
};

export const filterByTags = (items: any[], tags: string[]): any[] => {
  if (tags.length === 0) return items;
  return items.filter((item: any) => 
    item.tags && item.tags.some((tag: string) => tags.includes(tag))
  );
};

export const isScheduledForLater = (scheduledAt: any): boolean => {
  if (!scheduledAt) return false;
  return new Date(scheduledAt) > new Date();
};

export const getScheduledPublishTime = (scheduledAt: any): string => {
  if (!scheduledAt) return '';
  const now = new Date();
  const scheduled = new Date(scheduledAt);
  const diff = Math.max(0, Math.floor((scheduled.getTime() - now.getTime()) / 1000));
  
  if (diff === 0) return 'Ready to publish';
  
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};
