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
  pitchOffset: number; // in semitones, -12 to +12
}


export interface AudioContextState {
  audioContext: AudioContext | null;
  nextNoteTime: number;
  lookahead: number;
  scheduleAheadTime: number;
  timerWorker: Worker | null;
}

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 1, noteValue: 4, label: '1/4' },
  { beats: 2, noteValue: 4, label: '2/4' },
  { beats: 3, noteValue: 4, label: '3/4' },
  { beats: 4, noteValue: 4, label: '4/4' },
  { beats: 5, noteValue: 4, label: '5/4' },
  { beats: 6, noteValue: 4, label: '6/4' },
  { beats: 7, noteValue: 4, label: '7/4' },
  { beats: 2, noteValue: 2, label: '2/2' },
  { beats: 3, noteValue: 2, label: '3/2' },
  { beats: 3, noteValue: 8, label: '3/8' },
  { beats: 5, noteValue: 8, label: '5/8' },
  { beats: 6, noteValue: 8, label: '6/8' },
  { beats: 7, noteValue: 8, label: '7/8' },
  { beats: 8, noteValue: 8, label: '8/8' },
  { beats: 9, noteValue: 8, label: '9/8' },
  { beats: 10, noteValue: 8, label: '10/8' },
  { beats: 11, noteValue: 8, label: '11/8' },
  { beats: 12, noteValue: 8, label: '12/8' },
  { beats: 15, noteValue: 8, label: '15/8' },
];

export const DEFAULT_TIME_SIGNATURE = TIME_SIGNATURES[3]; // 4/4
export const MIN_BPM = 40;
export const MAX_BPM = 240;
export const DEFAULT_BPM = 120;
export const DEFAULT_VOLUME = 0.7; // 70% - comfortable listening level matching music apps
export const MIN_PITCH_OFFSET = -12; // -12 semitones (one octave down)
export const MAX_PITCH_OFFSET = 12; // +12 semitones (one octave up)
export const DEFAULT_PITCH_OFFSET = 0; // no pitch change