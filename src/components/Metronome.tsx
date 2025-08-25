import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import { useMetronome } from '../hooks/useMetronome';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import BeatIndicator from './BeatIndicator';
import TempoControl from './TempoControl';
import TimeSignatureSelector from './TimeSignatureSelector';

export default function Metronome() {
  const {
    isPlaying,
    bpm,
    timeSignature,
    currentBeat,
    togglePlay,
    setBpm,
    setTimeSignature,
    tapTempo,
  } = useMetronome();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Space',
      action: togglePlay,
    },
  ]);

  return (
    <div className="bg-[var(--theme-bg-card)] backdrop-blur rounded-2xl w-full max-w-2xl mx-4 border border-[var(--theme-border-primary)]">
      {/* Header Section */}
      <div className="p-8 pb-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl text-[var(--theme-text-secondary)]">Tempo</h1>
          
          {/* Play Button */}
          <button
            onClick={togglePlay}
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 text-[var(--theme-text-inverse)] ${
              isPlaying
                ? 'bg-[var(--theme-accent-stop)] hover:bg-[var(--theme-accent-stop-hover)]'
                : 'bg-[var(--theme-accent-play)] hover:bg-[var(--theme-accent-play-hover)]'
            }`}
          >
            {isPlaying ? (
              <PauseIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 ml-0.5" />
            )}
          </button>
        </div>
        
        {/* Large Tempo Display */}
        <div className="text-center mb-6">
          <div className="text-8xl font-light text-[var(--theme-text-primary)] mb-2 tracking-tight">
            {bpm}
          </div>
          <div className="text-sm text-[var(--theme-accent-tempo)] font-mono uppercase tracking-wider">
            BPM = QUARTERS
          </div>
        </div>

        {/* Beat Indicator */}
        <BeatIndicator
          currentBeat={currentBeat}
          timeSignature={timeSignature}
          isPlaying={isPlaying}
        />
      </div>

      {/* Control Panel */}
      <div className="bg-[var(--theme-bg-control)] p-6 rounded-b-2xl border-t border-[var(--theme-border-secondary)]">
        <div className="grid grid-cols-2 gap-5">
          {/* Tempo Control Card */}
          <div className="bg-[var(--theme-bg-control)] rounded-xl p-5 border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-200">
            <label className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-4 block text-center font-medium">TEMPO</label>
            <TempoControl
              bpm={bpm}
              setBpm={setBpm}
              tapTempo={tapTempo}
            />
          </div>

          {/* Time Signature Card */}
          <div className="bg-[var(--theme-bg-control)] rounded-xl p-5 border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-200">
            <label className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-4 block text-center font-medium">TIME SIGNATURE</label>
            <div className="flex justify-center">
              <TimeSignatureSelector
                timeSignature={timeSignature}
                setTimeSignature={setTimeSignature}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}