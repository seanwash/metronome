import { KnobControl } from './KnobControl';
import { MIN_BPM, MAX_BPM } from '../types';

interface TempoControlProps {
  bpm: number;
  setBpm: (bpm: number) => void;
  tapTempo: () => void;
}

export default function TempoControl({ bpm, setBpm, tapTempo }: TempoControlProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Knob control */}
      <div className="mb-3">
        <KnobControl
          value={bpm}
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
          onChange={setBpm}
          aria-label="Tempo"
        />
      </div>

      {/* BPM Display */}
      <div className="text-center mb-3">
        <div className="text-lg font-mono font-semibold text-[var(--theme-text-primary)] tracking-tight">
          {bpm} <span className="text-sm text-[var(--theme-text-muted)] font-normal">BPM</span>
        </div>
      </div>

      {/* Tap Tempo Button */}
      <button
        onClick={tapTempo}
        className="px-3 py-1.5 bg-[var(--theme-bg-control)] hover:bg-[var(--theme-bg-control-hover)] rounded-md border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-150 text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] font-mono uppercase tracking-wider"
      >
        TAP
      </button>
    </div>
  );
}