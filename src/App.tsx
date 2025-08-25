import Metronome from './components/Metronome'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ThemeProvider } from './contexts/ThemeContext'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-[var(--theme-bg-primary)] via-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] flex flex-col items-center justify-center space-y-4 p-4">
        {/* Theme Switcher and GitHub Link - positioned at top right */}
        <div className="absolute top-4 right-4 flex items-center space-x-3">
          <a
            href="https://github.com/seanwash/metronome"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--theme-border-primary)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)] hover:bg-[var(--theme-interactive-hover)] transition-all duration-200"
            title="View on GitHub"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
          <ThemeSwitcher />
        </div>
        
        <Metronome />
      </div>
    </ThemeProvider>
  )
}

export default App