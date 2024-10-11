import { SongAction, TSong } from 'src/types';

const songReducer = (state: TSong, action: SongAction): TSong => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload,
      };
    case 'SET_VERSION':
      return {
        ...state,
        version: action.payload,
      };
    case 'SET_WRITTEN_BY':
      return {
        ...state,
        writtenBy: action.payload,
      };
    case 'SET_GEMA_WERKNUMMER':
      return {
        ...state,
        gemaWerknummer: action.payload,
      };
    case 'SET_DURATION':
      return {
        ...state,
        durationMinutes: action.payload.minutes,
        durationSeconds: action.payload.seconds,
      };
    case 'SET_LINEUP':
      return {
        ...state,
        lineup: action.payload,
      };
    case 'SET_SCALE':
      return {
        ...state,
        scale: action.payload,
      };
    case 'SET_TEMPO':
      return {
        ...state,
        tempo: action.payload,
      };
    case 'SET_TIME_SIGNATURE':
      return {
        ...state,
        timeSignature: action.payload,
      };
    case 'SET_SETUP':
      return {
        ...state,
        setup: action.payload,
      };
    case 'SET_CONFIG_LYRIC_PAGE_MODE':
      return {
        ...state,
        configLyricPageMode: action.payload,
      };
    case 'SET_CONFIG_CHORD_PANE_SIZE':
      return {
        ...state,
        configChordPaneSize: action.payload,
      };
    case 'ADD_PAGE':
      return {
        ...state,
        pages: [...state.pages, action.payload],
      };
    case 'REMOVE_PAGE':
      return {
        ...state,
        pages: state.pages.filter((_, i) => i !== action.payload),
      };
    case 'SET_PAGE':
      return {
        ...state,
        pages: state.pages.map((page, i) => (i === action.payload.index ? action.payload.page : page)),
      };
    default:
      return state;
  }
};

export default songReducer;
