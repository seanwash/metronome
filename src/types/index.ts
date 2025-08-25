export interface TimeSignature {
  beats: number;
  noteValue: number;
  label: string;
}

export interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  timeSignature: TimeSignature;
  currentBeat: number;
  volume: number;
}


export interface AudioContextState {
  audioContext: AudioContext | null;
  nextNoteTime: number;
  lookahead: number;
  scheduleAheadTime: number;
  timerWorker: Worker | null;
}

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, noteValue: 4, label: '2/4' },
  { beats: 3, noteValue: 4, label: '3/4' },
  { beats: 4, noteValue: 4, label: '4/4' },
  { beats: 5, noteValue: 4, label: '5/4' },
  { beats: 6, noteValue: 4, label: '6/4' },
  { beats: 6, noteValue: 8, label: '6/8' },
  { beats: 7, noteValue: 8, label: '7/8' },
  { beats: 9, noteValue: 8, label: '9/8' },
  { beats: 12, noteValue: 8, label: '12/8' },
];

export const DEFAULT_TIME_SIGNATURE = TIME_SIGNATURES[2]; // 4/4
export const MIN_BPM = 40;
export const MAX_BPM = 240;
export const DEFAULT_BPM = 120;