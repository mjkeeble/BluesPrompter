import { BREAK } from 'src/const';
import { Break } from 'src/types';
import { describe, expect, it } from 'vitest';
import { displayDate, flattenSetlist, hasMatchingBrackets, validateDuration, validateGemaWerknummer } from '../utils';

describe('hasMatchingBrackets', () => {
  it('should return true for matching brackets', () => {
    expect(hasMatchingBrackets('[test]')).toBe(true);
  });

  it('should return false for nested brackets', () => {
    expect(hasMatchingBrackets('[[test]]')).toBe(false);
  });

  it('should return false for unmatched opening bracket', () => {
    expect(hasMatchingBrackets('[test')).toBe(false);
  });

  it('should return false for unmatched closing bracket', () => {
    expect(hasMatchingBrackets('test]')).toBe(false);
  });

  it('should return true for empty string', () => {
    expect(hasMatchingBrackets('')).toBe(true);
  });
});

describe('displayDate', () => {
  it('should format date correctly', () => {
    expect(displayDate('2023-10-05')).toBe('5 October 2023');
  });
});

describe('validateGemaWerknummer', () => {
  it('should return true for valid GEMA-Werknummer', () => {
    expect(validateGemaWerknummer('12345678-123')).toBe(true);
  });

  it('should return false for invalid GEMA-Werknummer', () => {
    const testString = ['123123', 'abc-123', '12345678-1234', '1234-12', '1234567890-123'];
    testString.forEach((element) => {
      expect(validateGemaWerknummer(element)).toBe(false);
    });
  });
});

describe('validateDuration', () => {
  it('should return true for valid duration', () => {
    expect(validateDuration(5, 30)).toBe(true);
  });

  it('should return false for negative minutes', () => {
    expect(validateDuration(-1, 30)).toBe(false);
  });

  it('should return false for negative seconds', () => {
    expect(validateDuration(5, -1)).toBe(false);
  });

  it('should return false for seconds equal to 60', () => {
    expect(validateDuration(5, 60)).toBe(false);
  });

  it('should return false for seconds greater than 60', () => {
    expect(validateDuration(5, 100)).toBe(false);
  });
});

describe('flattenSetlist', () => {
  it('should flatten the setlist and add BREAK elements', () => {
    const setlist = [['1', '2', '3'], ['4', '5'], ['6']];

    const expectedOutput = [BREAK as Break, '1', '2', '3', BREAK as Break, '4', '5', BREAK as Break, '6', BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty setlist', () => {
    const setlist: string[][] = [];

    const expectedOutput = [BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with empty subarrays', () => {
    const setlist = [[], ['1', '2'], []];

    const expectedOutput = [BREAK as Break, '1', '2', BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with a single element', () => {
    const setlist = [['1']];

    const expectedOutput = ['1'];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with multiple single-element subarrays', () => {
    const setlist = [['1'], ['2'], ['3']];

    const expectedOutput = [BREAK as Break, 1, BREAK as Break, 2, BREAK as Break, 3, BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with mixed empty and non-empty subarrays', () => {
    const setlist = [[], ['1'], [], ['2', '3'], [], ['4'], []];

    const expectedOutput = [BREAK as Break, '1', BREAK as Break, '2', '3', BREAK as Break, '4', BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle a setlist with all empty subarrays', () => {
    const setlist = [[], [], []];

    const expectedOutput = [BREAK as Break];

    const result = flattenSetlist(setlist);
    expect(result).toEqual(expectedOutput);
  });
});
