import { BREAK } from 'src/const';
import { TBreak, TSetlist } from 'src/types';

const gemaRegex = '^\\d{1,8}-\\d{3}$';

export const hasMatchingBrackets = (str: string): boolean => {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') {
      depth++;
      if (depth > 1) return false;
    } else if (str[i] === ']') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
};

export const displayDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const validateGemaWerknummer = (gemaWerknummer: string): boolean => {
  return new RegExp(gemaRegex).test(gemaWerknummer);
};

export const validateDuration = (minutes: number, seconds: number): boolean => {
  return minutes >= 0 && seconds >= 0 && seconds < 60;
};

export const flattenSetlist = (setlist: number[][]): TSetlist => {
  return setlist.flatMap((subArray) => [BREAK as TBreak, ...subArray.map(Number)]).concat([BREAK as TBreak]);
};
