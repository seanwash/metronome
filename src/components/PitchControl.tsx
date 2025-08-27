import React from 'react';
import { KnobControl } from './KnobControl';
import { MIN_PITCH_OFFSET, MAX_PITCH_OFFSET, DEFAULT_PITCH_OFFSET } from '../types';

interface PitchControlProps {
  pitchOffset: number;
  onPitchChange: (pitchOffset: number) => void;
}

export const PitchControl: React.FC<PitchControlProps> = ({ 
  pitchOffset, 
  onPitchChange 
}) => {
  const handleDoubleClick = () => {
    onPitchChange(DEFAULT_PITCH_OFFSET);
  };

  // Format pitch offset display
  const formatPitch = (offset: number) => {
    if (offset === 0) return '0';
    return offset > 0 ? `+${offset}` : `${offset}`;
  };

  return (
    <div className="flex flex-col items-center" onDoubleClick={handleDoubleClick}>
      {/* Knob control */}
      <div className="mb-3">
        <KnobControl
          value={pitchOffset}
          min={MIN_PITCH_OFFSET}
          max={MAX_PITCH_OFFSET}
          step={1}
          onChange={onPitchChange}
          aria-label="Pitch offset"
        />
      </div>

      {/* Pitch Display */}
      <div className="text-center mb-3">
        <div className="text-lg font-mono font-semibold text-[var(--theme-text-primary)] tracking-tight">
          {formatPitch(pitchOffset)}<span className="text-sm text-[var(--theme-text-muted)] font-normal"> ST</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleDoubleClick}
        className="px-3 py-1.5 bg-[var(--theme-bg-control)] hover:bg-[var(--theme-bg-control-hover)] rounded-md border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-150 text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] font-mono uppercase tracking-wider"
        aria-label="Reset pitch to default"
      >
        ♪
      </button>
    </div>
  );
};