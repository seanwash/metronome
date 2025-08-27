import { useState, useEffect, useRef, useCallback } from 'react';
import { MetronomeAudioEngine } from '../utils/audioEngine';
import type { 
  MetronomeState, 
  TimeSignature
} from '../types';
import {
  DEFAULT_TIME_SIGNATURE, 
  DEFAULT_BPM,
  DEFAULT_VOLUME,
  DEFAULT_PITCH_OFFSET
} from '../types';

export const useMetronome = () => {
  const audioEngineRef = useRef<MetronomeAudioEngine | null>(null);
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: DEFAULT_BPM,
    timeSignature: DEFAULT_TIME_SIGNATURE,
    currentBeat: 0,
    volume: DEFAULT_VOLUME,
    pitchOffset: DEFAULT_PITCH_OFFSET,
  });

  // Initialize audio engine
  useEffect(() => {
    audioEngineRef.current = new MetronomeAudioEngine();
    
    audioEngineRef.current.onBeat((beat) => {
      setState(prev => ({ ...prev, currentBeat: beat }));
    });

    return () => {
      audioEngineRef.current?.destroy();
    };
  }, []);

  const initializeAudio = useCallback(async () => {
    if (audioEngineRef.current) {
      await audioEngineRef.current.initialize();
    }
  }, []);

  const play = useCallback(async () => {
    if (!audioEngineRef.current) return;

    try {
      await initializeAudio();
      audioEngineRef.current.start();
      setState(prev => ({ ...prev, isPlaying: true }));
    } catch (error) {
      console.error('Failed to start metronome:', error);
    }
  }, [initializeAudio]);

  const stop = useCallback(() => {
    if (!audioEngineRef.current) return;

    audioEngineRef.current.stop();
    setState(prev => ({ ...prev, isPlaying: false, currentBeat: 0 }));
  }, []);

  const togglePlay = useCallback(async () => {
    if (state.isPlaying) {
      stop();
    } else {
      await play();
    }
  }, [state.isPlaying, play, stop]);

  const setBpm = useCallback((bpm: number) => {
    const clampedBpm = Math.max(40, Math.min(240, bpm));
    audioEngineRef.current?.setTempo(clampedBpm);
    setState(prev => ({ ...prev, bpm: clampedBpm }));
  }, []);

  const setTimeSignature = useCallback((timeSignature: TimeSignature) => {
    audioEngineRef.current?.setTimeSignature(timeSignature);
    setState(prev => ({ ...prev, timeSignature, currentBeat: 0 }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    audioEngineRef.current?.setVolume(clampedVolume);
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const setPitchOffset = useCallback((pitchOffset: number) => {
    const clampedPitch = Math.max(-12, Math.min(12, pitchOffset));
    audioEngineRef.current?.setPitchOffset(clampedPitch);
    setState(prev => ({ ...prev, pitchOffset: clampedPitch }));
  }, []);

  const tapTempo = useCallback(() => {
    // Simple tap tempo implementation
    const now = Date.now();
    const tapTimes = JSON.parse(localStorage.getItem('tapTimes') || '[]');
    
    tapTimes.push(now);
    
    // Keep only last 8 taps
    if (tapTimes.length > 8) {
      tapTimes.shift();
    }
    
    localStorage.setItem('tapTimes', JSON.stringify(tapTimes));
    
    if (tapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimes.length; i++) {
        intervals.push(tapTimes[i] - tapTimes[i - 1]);
      }
      
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  }, [setBpm]);


  return {
    ...state,
    play,
    stop,
    togglePlay,
    setBpm,
    setTimeSignature,
    setVolume,
    setPitchOffset,
    tapTempo,
  };
};