export const BREAK = 'break';

export const ACTIVEKEYS = ['u', 'i', 'o', 'j', 'k', 'l'];

export const footswitch = {
  leftShort: 'u',
  centreShort: 'i',
  rightShort: 'o',
  leftLong: 'j',
  centreLong: 'k',
  rightLong: 'l',
};

export const CHORDS_FIRST = 'chords-first';
export const CHORDS_INLINE = 'chords-inline';
export const CHORDS_ONLY = 'chords-only';
export const LYRICS_FIRST = 'lyrics-first';
export const LYRICS_ONLY = 'lyrics-only';

export const LYRIC_PAGE_MODES = [CHORDS_FIRST, CHORDS_INLINE, CHORDS_ONLY, LYRICS_FIRST, LYRICS_ONLY];

export const ORIENTATION_LANDSCAPE = 'landscape';
export const ORIENTATION_PORTRAIT = 'portrait';

export const TEXT_SM = 'text-sm';
export const TEXT_MD = 'text-med';
export const TEXT_LG = 'text-lg';
export const TEXT_XL = 'text-xl';
export const TEXT_2XL = 'text-2xl';

export const TEXT_SIZES = [TEXT_SM, TEXT_MD, TEXT_LG, TEXT_XL, TEXT_2XL];

export const MAX_LYRIC_FONT_SIZE = {
  '100': { size: 100, reductionIncrement: 1 },
  '150': { size: 150, reductionIncrement: 2 },
  '250': { size: 250, reductionIncrement: 3 },
};
