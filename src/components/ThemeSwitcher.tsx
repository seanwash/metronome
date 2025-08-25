import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../types/theme';

export default function ThemeSwitcher() {
  const { themeMode, setThemeMode } = useTheme();

  const themes: { mode: ThemeMode; icon: React.ReactElement; label: string }[] = [
    { mode: 'light', icon: <SunIcon className="h-4 w-4" />, label: 'Light' },
    { mode: 'dark', icon: <MoonIcon className="h-4 w-4" />, label: 'Dark' },
    { mode: 'system', icon: <DesktopIcon className="h-4 w-4" />, label: 'System' },
  ];

  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-[var(--theme-border-primary)]">
      {themes.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => setThemeMode(mode)}
          className={`flex items-center justify-center px-3 py-2 text-sm font-mono transition-all duration-200 ${
            themeMode === mode
              ? 'bg-[var(--theme-interactive-active)] text-[var(--theme-text-primary)] border-r border-[var(--theme-border-hover)]'
              : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)] hover:bg-[var(--theme-interactive-hover)]'
          } ${mode !== 'system' ? 'border-r border-[var(--theme-border-secondary)]' : ''}`}
          title={`Switch to ${label} theme`}
        >
          <span className="mr-1">{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}