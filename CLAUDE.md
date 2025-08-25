# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (starts Vite dev server with HMR)
- **Build**: `npm run build` (TypeScript compilation + Vite build)
- **Lint**: `npm run lint` (ESLint with TypeScript support)
- **Preview**: `npm run preview` (preview production build)

## Architecture Overview

This is a React + TypeScript metronome application built with Vite and styled with Tailwind CSS v4. The app uses Web Audio API for precise timing and audio generation.

### Core Architecture

- **App Component** (`src/App.tsx`): Simple root component that renders the Metronome
- **Metronome Component** (`src/components/Metronome.tsx`): Main UI component orchestrating all metronome functionality
- **useMetronome Hook** (`src/hooks/useMetronome.ts`): Central state management and business logic
- **AudioEngine** (`src/utils/audioEngine.ts`): Web Audio API wrapper with Web Worker for precise timing

### Audio System

The audio system uses a sophisticated timing approach:
- **MetronomeAudioEngine** class handles all audio operations
- Uses a **Web Worker** for precise timing (25ms lookahead)
- **Web Audio API** for sound generation (oscillators)
- Different frequencies for downbeats (880Hz) vs regular beats (440Hz)
- Audio context initialization requires user interaction (handled by play button)

### State Management

All state is managed through the `useMetronome` hook which provides:
- Play/stop controls with audio context management
- BPM control (40-240 range with validation)
- Time signature selection (various signatures from 2/4 to 12/8)
- Tap tempo functionality with 8-tap averaging
- Theme state managed via `useTheme` hook and ThemeContext
- Keyboard shortcuts handled by `useKeyboardShortcuts` hook

### Component Structure

- **BeatIndicator**: Visual metronome with beat highlighting
- **TempoControl**: BPM slider and tap tempo button
- **TimeSignatureSelector**: Dropdown for time signature selection
- **ThemeSwitcher**: Light/dark theme toggle

### Key Technical Details

- Uses Radix UI components for consistent, accessible UI elements
- TypeScript interfaces defined in `src/types/index.ts` and `src/types/theme.ts`
- Theme data persisted to localStorage via ThemeContext
- Audio timing uses lookahead scheduling to prevent drift
- Worker blob creation inline (no separate worker files)
- Keyboard shortcuts support (Space for play/pause)

### Styling

- **Tailwind CSS v4** with Vite integration
- Dark theme (gray-900 background)
- Responsive design principles
- Uses Tailwind utilities throughout components