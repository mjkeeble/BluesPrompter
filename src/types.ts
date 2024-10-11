import { ACTIVEKEYS, BREAK, LYRIC_PAGE_MODES, TEXT_SIZES } from './const';

export type TGig = {
  id: string;
  venue: string;
  town: string;
  dateTime: string;
  setlist: number[][];
};

export type TSong = {
  id: number;
  title: string;
  version?: string;
  writtenBy: string[];
  gemaWerknummer?: string;
  lineup?: string;
  scale?: string;
  tempo?: number;
  timeSignature?: string;
  setup?: string;
  configLyricPageMode?: TMode;
  configChordPaneSize?: number;
  pages: TLyricPage[];
  notes?: string;
} & ({ durationMinutes?: never; durationSeconds?: never } | { durationMinutes: number; durationSeconds: number });

export type TLyricPage = {
  chords: string[][];
  section: string;
  lyrics: string[];
  duration?: number; // in bars
};

export type TAction = {
  keyPressed: string | null;
  isLongPress: boolean;
};

export type TBreak = typeof BREAK;

export type TSetlist = (number | TBreak)[];

export type TInput = (typeof ACTIVEKEYS)[number] | null;

export type TMode = (typeof LYRIC_PAGE_MODES)[number];

// export type TChordPaneSize = 2 | 3 | 4 | 5 | 6 | 7;

export type TConfig = {
  lyricPageMode?: TMode; // display mode for lyrics page
  chordPaneSize?: number; // portion of screen for chords (x/10)
  portrait: boolean; // screen orientation
  chordFontSize?: (typeof TEXT_SIZES)[number]; // size of chord text
  lyricMinFontSize: number; // min size of lyric text
  lyricMaxFontSize: '100' | '150' | '250'; // max size of lyric text
};

export type symbolKeys =
  | 'backward'
  | 'backwardFast'
  | 'backwardStep'
  | 'down'
  | 'forward'
  | 'forwardFast'
  | 'forwardStep'
  | 'pause'
  | 'point'
  | 'play'
  | 'stop'
  | 'up'
  | undefined;

export type SongAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_VERSION'; payload: string }
  | { type: 'SET_WRITTEN_BY'; payload: string[] }
  | { type: 'SET_GEMA_WERKNUMMER'; payload: string }
  | { type: 'SET_DURATION'; payload: { minutes: number; seconds: number } }
  | { type: 'SET_LINEUP'; payload: string }
  | { type: 'SET_SCALE'; payload: string }
  | { type: 'SET_TEMPO'; payload: number }
  | { type: 'SET_TIME_SIGNATURE'; payload: string }
  | { type: 'SET_SETUP'; payload: string }
  | { type: 'SET_CONFIG_LYRIC_PAGE_MODE'; payload: string }
  | { type: 'SET_CONFIG_CHORD_PANE_SIZE'; payload: number }
  | { type: 'ADD_PAGE'; payload: TLyricPage }
  | { type: 'REMOVE_PAGE'; payload: number }
  | { type: 'SET_PAGE'; payload: { index: number; page: TLyricPage } };
