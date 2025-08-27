import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import { useMetronome } from '../hooks/useMetronome';
import { DEFAULT_VOLUME, DEFAULT_PITCH_OFFSET } from '../types';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import BeatIndicator from './BeatIndicator';
import TempoControl from './TempoControl';
import TimeSignatureSelector from './TimeSignatureSelector';
import { VolumeControl } from './VolumeControl';
import { PitchControl } from './PitchControl';
import { ControlCard } from './ControlCard';

export default function Metronome() {
  const {
    isPlaying,
    bpm,
    timeSignature,
    currentBeat,
    volume,
    pitchOffset,
    togglePlay,
    setBpm,
    setTimeSignature,
    setVolume,
    setPitchOffset,
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* Tempo Control Card */}
          <ControlCard label="TEMPO">
            <TempoControl
              bpm={bpm}
              setBpm={setBpm}
              tapTempo={tapTempo}
            />
          </ControlCard>

          {/* Time Signature Card */}
          <ControlCard label="TIME SIGNATURE">
            <div className="flex justify-center">
              <TimeSignatureSelector
                timeSignature={timeSignature}
                setTimeSignature={setTimeSignature}
              />
            </div>
          </ControlCard>

          {/* Volume Control Card */}
          <ControlCard 
            label="VOLUME"
            onDoubleClick={() => setVolume(DEFAULT_VOLUME)}
          >
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
            />
          </ControlCard>

          {/* Pitch Control Card */}
          <ControlCard 
            label="PITCH"
            onDoubleClick={() => setPitchOffset(DEFAULT_PITCH_OFFSET)}
          >
            <PitchControl
              pitchOffset={pitchOffset}
              onPitchChange={setPitchOffset}
            />
          </ControlCard>
        </div>
      </div>
    </div>
  );
}