import * as Slider from '@radix-ui/react-slider';
import { MIN_BPM, MAX_BPM } from '../types';

interface TempoControlProps {
  bpm: number;
  setBpm: (bpm: number) => void;
  tapTempo: () => void;
}

export default function TempoControl({ bpm, setBpm, tapTempo }: TempoControlProps) {
  const handleSliderChange = (value: number[]) => {
    setBpm(value[0]);
  };

  const percentage = ((bpm - MIN_BPM) / (MAX_BPM - MIN_BPM)) * 100;
  const rotation = (percentage / 100) * 270 - 135; // -135 to 135 degrees

  return (
    <div className="flex flex-col items-center">
      {/* Simplified knob control */}
      <div className="relative w-18 h-18 mb-3">
        {/* Outer ring */}
        <div className="w-18 h-18 bg-[var(--theme-bg-control)] rounded-full border border-[var(--theme-border-secondary)] flex items-center justify-center">
          {/* Inner knob */}
          <div 
            className="w-14 h-14 bg-[var(--theme-text-secondary)] rounded-full relative flex items-center justify-center cursor-pointer hover:bg-[var(--theme-text-primary)] transition-colors duration-150"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Knob indicator line */}
            <div className="absolute w-0.5 h-5 bg-[var(--theme-text-inverse)] top-1 rounded-full"></div>
          </div>
        </div>
        
        {/* Hidden slider for actual control */}
        <Slider.Root
          className="absolute inset-0 opacity-0 cursor-pointer"
          value={[bpm]}
          onValueChange={handleSliderChange}
          max={MAX_BPM}
          min={MIN_BPM}
          step={1}
        >
          <Slider.Track className="w-full h-full">
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb aria-label="Tempo" />
        </Slider.Root>
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