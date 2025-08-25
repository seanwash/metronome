import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';
import type { TimeSignature } from '../types';
import { TIME_SIGNATURES } from '../types';

interface TimeSignatureSelectorProps {
  timeSignature: TimeSignature;
  setTimeSignature: (timeSignature: TimeSignature) => void;
}

export default function TimeSignatureSelector({ 
  timeSignature, 
  setTimeSignature 
}: TimeSignatureSelectorProps) {
  const handleValueChange = (value: string) => {
    const sig = TIME_SIGNATURES.find(s => s.label === value);
    if (sig) {
      setTimeSignature(sig);
    }
  };

  return (
    <Select.Root value={timeSignature.label} onValueChange={handleValueChange}>
      <Select.Trigger className="inline-flex items-center justify-center px-4 py-2 bg-[var(--theme-bg-control)] hover:bg-[var(--theme-bg-control-hover)] rounded-lg border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] focus:outline-none focus:border-[var(--theme-border-focus)] text-[var(--theme-text-primary)] font-mono transition-all duration-150 min-w-[70px]">
        <Select.Value aria-label={timeSignature.label}>
          <span className="text-lg font-semibold">{timeSignature.label}</span>
        </Select.Value>
        <Select.Icon className="text-[var(--theme-text-secondary)] ml-2">
          <ChevronDownIcon className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-[var(--theme-bg-card)] backdrop-blur-sm rounded-lg shadow-xl z-50 border border-[var(--theme-border-primary)]">
          <Select.Viewport className="p-1">
            {TIME_SIGNATURES.map((sig) => (
              <Select.Item
                key={sig.label}
                className="relative flex items-center px-6 py-2 text-sm text-[var(--theme-text-primary)] rounded cursor-default select-none hover:bg-[var(--theme-interactive-hover)] focus:bg-[var(--theme-interactive-hover)] focus:outline-none font-mono transition-colors"
                value={sig.label}
              >
                <Select.ItemText>{sig.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="w-3 h-3 text-[var(--theme-text-secondary)]" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}