import type { TimeSignature } from '../types';
import { DEFAULT_VOLUME } from '../types';

export class MetronomeAudioEngine {
  private audioContext: AudioContext | null = null;
  private nextNoteTime = 0.0;
  private lookahead = 25.0; // milliseconds - used by worker
  private scheduleAheadTime = 0.1; // seconds
  private timerWorker: Worker | null = null;
  private tempo = 120;
  private timeSignature: TimeSignature = { beats: 4, noteValue: 4, label: '4/4' };
  private currentBeat = 0;
  private isPlaying = false;
  private volume = DEFAULT_VOLUME; // Default volume (0-1)
  private pitchOffset = 0; // semitones, -12 to +12
  private onBeatCallback?: (beat: number) => void;

  constructor() {
    this.createWorker();
  }

  private createWorker() {
    const workerBlob = new Blob([`
      let timerID = null;
      let interval = 25; // matches lookahead

      self.onmessage = function(e) {
        if (e.data === "start") {
          timerID = setInterval(() => self.postMessage("tick"), interval);
        } else if (e.data.interval) {
          interval = e.data.interval;
          if (timerID) {
            clearInterval(timerID);
            timerID = setInterval(() => self.postMessage("tick"), interval);
          }
        } else if (e.data === "stop") {
          clearInterval(timerID);
          timerID = null;
        }
      };
    `], { type: 'application/javascript' });

    this.timerWorker = new Worker(URL.createObjectURL(workerBlob));
    this.timerWorker.onmessage = () => {
      if (this.isPlaying) {
        this.scheduler();
      }
    };
    
    // Set the worker interval to match our lookahead
    this.timerWorker.postMessage({ interval: this.lookahead });
  }

  async initialize(): Promise<void> {
    if (!this.audioContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
  }

  private playNote(time: number, isDownbeat: boolean = false) {
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Different frequencies for downbeat vs regular beat, with pitch offset
    const baseFreq = isDownbeat ? 880 : 440;
    // Calculate frequency with pitch offset using equal temperament formula
    // Each semitone = 2^(1/12) ratio
    const pitchMultiplier = Math.pow(2, this.pitchOffset / 12);
    osc.frequency.value = baseFreq * pitchMultiplier;
    
    // Apply volume control with quadratic scaling for better perceived linearity
    // Quadratic scaling (volume^2) provides more intuitive volume control than cubic
    // Base gain of 0.65 targets streaming service levels (-14 to -16 LUFS)
    // At 70% default: 0.65 * 0.49 = ~0.32 gain (comfortable listening level)
    // At 100%: 0.65 * 1.0 = 0.65 gain (matches typical music app volumes)
    const volumeCurve = Math.pow(this.volume, 2);
    const maxGain = 0.65 * volumeCurve;
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(maxGain, time + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.start(time);
    osc.stop(time + 0.1);
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;

    this.currentBeat++;
    if (this.currentBeat >= this.timeSignature.beats) {
      this.currentBeat = 0;
    }
  }

  private scheduler() {
    if (!this.audioContext) return;

    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      const isDownbeat = this.currentBeat === 0;
      this.playNote(this.nextNoteTime, isDownbeat);
      
      if (this.onBeatCallback) {
        this.onBeatCallback(this.currentBeat);
      }

      this.nextNote();
    }
  }

  start() {
    if (!this.audioContext) {
      throw new Error('Audio context not initialized. Call initialize() first.');
    }

    this.isPlaying = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.audioContext.currentTime;
    this.timerWorker?.postMessage('start');
  }

  stop() {
    this.isPlaying = false;
    this.timerWorker?.postMessage('stop');
    this.currentBeat = 0;
  }

  setTempo(bpm: number) {
    this.tempo = Math.max(40, Math.min(240, bpm));
  }

  setTimeSignature(timeSignature: TimeSignature) {
    this.timeSignature = timeSignature;
    this.currentBeat = 0;
  }

  onBeat(callback: (beat: number) => void) {
    this.onBeatCallback = callback;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setPitchOffset(pitchOffset: number) {
    this.pitchOffset = Math.max(-12, Math.min(12, pitchOffset));
  }

  getTempo(): number {
    return this.tempo;
  }

  getTimeSignature(): TimeSignature {
    return this.timeSignature;
  }

  getCurrentBeat(): number {
    return this.currentBeat;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getVolume(): number {
    return this.volume;
  }

  getPitchOffset(): number {
    return this.pitchOffset;
  }

  destroy() {
    this.stop();
    this.timerWorker?.terminate();
    this.audioContext?.close();
  }
}