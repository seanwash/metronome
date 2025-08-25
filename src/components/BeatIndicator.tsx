import type { TimeSignature } from '../types';

interface BeatIndicatorProps {
  currentBeat: number;
  timeSignature: TimeSignature;
  isPlaying: boolean;
}

export default function BeatIndicator({ currentBeat, timeSignature, isPlaying }: BeatIndicatorProps) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {Array.from({ length: timeSignature.beats }, (_, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
            isPlaying && index === currentBeat
              ? index === 0
                ? 'bg-[var(--theme-accent-beat-downbeat)] border-[var(--theme-accent-beat-downbeat)] shadow-lg'
                : 'bg-[var(--theme-accent-beat-active)] border-[var(--theme-accent-beat-active)] shadow-md'
              : 'bg-[var(--theme-accent-beat-inactive)] border-[var(--theme-border-primary)]'
          }`}
        />
      ))}
    </div>
  );
}