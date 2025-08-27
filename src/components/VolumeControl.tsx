import React from 'react';
import { SpeakerLoudIcon, SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons';
import { KnobControl } from './KnobControl';
import { DEFAULT_VOLUME } from '../types';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  const percentageVolume = Math.round(volume * 100);

  const handleToggleMute = () => {
    onVolumeChange(volume === 0 ? DEFAULT_VOLUME : 0);
  };

  const handleDoubleClick = () => {
    onVolumeChange(DEFAULT_VOLUME);
  };

  // Choose icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) return <SpeakerOffIcon className="w-4 h-4" />;
    if (volume < DEFAULT_VOLUME) return <SpeakerModerateIcon className="w-4 h-4" />;
    return <SpeakerLoudIcon className="w-4 h-4" />;
  };

  return (
    <div className="flex flex-col items-center" onDoubleClick={handleDoubleClick}>
      {/* Knob control */}
      <div className="mb-3">
        <KnobControl
          value={volume}
          min={0}
          max={1}
          step={0.01}
          onChange={onVolumeChange}
          aria-label="Volume"
        />
      </div>

      {/* Volume Display */}
      <div className="text-center mb-3">
        <div className="text-lg font-mono font-semibold text-[var(--theme-text-primary)] tracking-tight">
          {percentageVolume}<span className="text-sm text-[var(--theme-text-muted)] font-normal">%</span>
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={handleToggleMute}
        className="px-3 py-1.5 bg-[var(--theme-bg-control)] hover:bg-[var(--theme-bg-control-hover)] rounded-md border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-150 text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] flex items-center justify-center"
        aria-label={volume === 0 ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
    </div>
  );
};