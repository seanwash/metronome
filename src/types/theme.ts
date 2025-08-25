export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  bgCardHover: string;
  bgControl: string;
  bgControlHover: string;
  bgOverlay: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  
  // Border colors
  borderPrimary: string;
  borderSecondary: string;
  borderHover: string;
  borderFocus: string;
  
  // Accent colors
  accentPlay: string;
  accentStop: string;
  accentPlayHover: string;
  accentStopHover: string;
  accentBeatActive: string;
  accentBeatDownbeat: string;
  accentBeatInactive: string;
  accentTempo: string;
  
  // Interactive colors
  interactiveHover: string;
  interactiveFocus: string;
  interactiveActive: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export const lightTheme: ThemeColors = {
  // Background colors
  bgPrimary: '#f8fafc', // slate-50
  bgSecondary: '#f1f5f9', // slate-100
  bgCard: 'rgba(255, 255, 255, 0.9)',
  bgCardHover: 'rgba(255, 255, 255, 0.95)',
  bgControl: 'rgba(248, 250, 252, 0.6)',
  bgControlHover: 'rgba(241, 245, 249, 0.8)',
  bgOverlay: 'rgba(0, 0, 0, 0.5)',
  
  // Text colors
  textPrimary: '#0f172a', // slate-900
  textSecondary: '#334155', // slate-700
  textMuted: '#64748b', // slate-500
  textInverse: '#ffffff',
  
  // Border colors
  borderPrimary: '#cbd5e1', // slate-300
  borderSecondary: '#e2e8f0', // slate-200
  borderHover: '#94a3b8', // slate-400
  borderFocus: '#3b82f6', // blue-500
  
  // Accent colors
  accentPlay: '#22c55e', // green-500
  accentStop: '#ef4444', // red-500
  accentPlayHover: '#16a34a', // green-600
  accentStopHover: '#dc2626', // red-600
  accentBeatActive: '#334155', // slate-700
  accentBeatDownbeat: '#0f172a', // slate-900
  accentBeatInactive: '#cbd5e1', // slate-300
  accentTempo: '#ef4444', // red-500
  
  // Interactive colors
  interactiveHover: 'rgba(248, 250, 252, 0.8)',
  interactiveFocus: 'rgba(59, 130, 246, 0.1)',
  interactiveActive: 'rgba(241, 245, 249, 0.9)',
};

export const darkTheme: ThemeColors = {
  // Background colors
  bgPrimary: '#0f172a', // slate-900
  bgSecondary: '#1e293b', // slate-800
  bgCard: 'rgba(30, 41, 59, 0.9)',
  bgCardHover: 'rgba(30, 41, 59, 0.95)',
  bgControl: 'rgba(71, 85, 105, 0.3)',
  bgControlHover: 'rgba(71, 85, 105, 0.6)',
  bgOverlay: 'rgba(0, 0, 0, 0.7)',
  
  // Text colors
  textPrimary: '#f8fafc', // slate-50
  textSecondary: '#cbd5e1', // slate-300
  textMuted: '#64748b', // slate-500
  textInverse: '#0f172a',
  
  // Border colors
  borderPrimary: '#475569', // slate-600
  borderSecondary: 'rgba(71, 85, 105, 0.4)',
  borderHover: '#64748b', // slate-500
  borderFocus: '#3b82f6', // blue-500
  
  // Accent colors
  accentPlay: '#22c55e', // green-500
  accentStop: '#ef4444', // red-500
  accentPlayHover: '#16a34a', // green-600
  accentStopHover: '#dc2626', // red-600
  accentBeatActive: '#cbd5e1', // slate-300
  accentBeatDownbeat: '#f8fafc', // slate-50
  accentBeatInactive: '#475569', // slate-600
  accentTempo: '#ef4444', // red-500
  
  // Interactive colors
  interactiveHover: 'rgba(71, 85, 105, 0.4)',
  interactiveFocus: 'rgba(59, 130, 246, 0.1)',
  interactiveActive: 'rgba(51, 65, 85, 0.6)',
};