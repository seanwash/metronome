import Metronome from './components/Metronome'
import ThemeSwitcher from './components/ThemeSwitcher'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-[var(--theme-bg-primary)] via-[var(--theme-bg-secondary)] to-[var(--theme-bg-primary)] text-[var(--theme-text-primary)] flex flex-col items-center justify-center space-y-4 p-4">
        {/* Theme Switcher - positioned at top right */}
        <div className="absolute top-4 right-4">
          <ThemeSwitcher />
        </div>
        
        <Metronome />
      </div>
    </ThemeProvider>
  )
}

export default App