import { BREAK } from 'src/const';
import { TBreak } from 'src/types';
import { describe, expect, it } from 'vitest';
import { flattenSetlist } from './utils';

describe('flattenSetlist', () => {
  it('should flatten the setlist and add BREAK elements', () => {
    const setlist = [[1, 2, 3], [4, 5], [6]];

    const expectedOutput = [BREAK as TBreak, 1, 2, 3, BREAK as TBreak, 4, 5, BREAK as TBreak, 6, BREAK as TBreak];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty setlist', () => {
    const setlist: number[][] = [];

    const expectedOutput = [BREAK as TBreak];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with empty subarrays', () => {
    const setlist = [[], [1, 2], []];

    const expectedOutput = [BREAK as TBreak, 1, 2, BREAK as TBreak];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });
});
