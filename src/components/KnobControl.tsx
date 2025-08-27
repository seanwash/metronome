import React from 'react';
import * as Slider from '@radix-ui/react-slider';

interface KnobControlProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

export const KnobControl: React.FC<KnobControlProps> = ({
  value,
  min,
  max,
  step,
  onChange,
  size = 'md',
  'aria-label': ariaLabel
}) => {
  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  // Normalize value to 0-1 range, then convert to rotation angle
  const normalizedValue = (value - min) / (max - min);
  const rotation = (normalizedValue * 270) - 135; // -135 to 135 degrees

  // Size variants
  const sizes = {
    sm: { outer: 'w-14 h-14', inner: 'w-10 h-10', indicator: 'w-0.5 h-4' },
    md: { outer: 'w-18 h-18', inner: 'w-14 h-14', indicator: 'w-0.5 h-5' },
    lg: { outer: 'w-24 h-24', inner: 'w-20 h-20', indicator: 'w-0.5 h-6' }
  };

  const sizeClasses = sizes[size];

  return (
    <div className="relative">
      {/* Outer ring */}
      <div className={`${sizeClasses.outer} bg-[var(--theme-bg-control)] rounded-full border border-[var(--theme-border-secondary)] flex items-center justify-center`}>
        {/* Inner knob */}
        <div 
          className={`${sizeClasses.inner} bg-[var(--theme-text-secondary)] rounded-full relative flex items-center justify-center cursor-pointer hover:bg-[var(--theme-text-primary)] transition-colors duration-150`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Knob indicator line */}
          <div className={`absolute ${sizeClasses.indicator} bg-[var(--theme-text-inverse)] top-1 rounded-full`}></div>
        </div>
      </div>
      
      {/* Hidden slider for actual control */}
      <Slider.Root
        className="absolute inset-0 opacity-0 cursor-pointer"
        value={[value]}
        onValueChange={handleSliderChange}
        max={max}
        min={min}
        step={step}
      >
        <Slider.Track className="w-full h-full">
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb aria-label={ariaLabel || 'Control knob'} />
      </Slider.Root>
    </div>
  );
};