import { FontSizeKey } from './types';

export const BREAK = 'BREAK';

export const ACTIVEKEYS = ['u', 'i', 'o', 'j', 'k', 'l'];

export const footswitch = {
  LEFT_SHORT: 'u',
  CENTRE_SHORT: 'i',
  RIGHT_SHORT: 'o',
  LEFT_LONG: 'j',
  CENTRE_LONG: 'k',
  RIGHT_LONG: 'l',
};

export const CHORDS_FIRST = 'CHORDS-FIRST';
export const CHORDS_INLINE = 'CHORDS-INLINE';
export const LYRICS_FIRST = 'LYRICS-FIRST';

// TODO: add inline chords to modes
export const LYRIC_PAGE_MODES = [CHORDS_FIRST, LYRICS_FIRST];

export const ORIENTATION_LANDSCAPE = 'landscape';
export const ORIENTATION_PORTRAIT = 'portrait';

export const TEXT_SM = 'text-base';
export const TEXT_MD = 'text-xl';
export const TEXT_LG = 'text-3xl';
export const TEXT_XL = 'text-5xl';
export const TEXT_2XL = 'text-7xl';

export const TEXT_SIZES = [TEXT_SM, TEXT_MD, TEXT_LG, TEXT_XL, TEXT_2XL];

export const MAX_LYRIC_FONT_SIZE = {
  100: { size: 100, reductionIncrement: 1 },
  150: { size: 150, reductionIncrement: 2 },
  250: { size: 250, reductionIncrement: 3 },
};

export const DEFAULT_MAX_FONT_SIZE: FontSizeKey = 150;
export const DEFAULT_MIN_FONT_SIZE = 20;
