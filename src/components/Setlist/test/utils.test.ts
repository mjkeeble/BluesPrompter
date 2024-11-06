// utils.test.ts
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchSongs } from '../utils';

const mockSongs = [
  {
    id: 1,
    title: 'Test Song',
    version: undefined,
    writtenBy: ['Test Writer'],
    pages: [],
  },
  {
    id: 2,
    title: 'Test Song 2',
    version: 'Test Version',
    writtenBy: ['Test Writer 2'],
    pages: [],
  },
];

const expectedOutput = [
  {
    id: 1,
    title: 'Test Song',
    version: undefined,
  },
  {
    id: 2,
    title: 'Test Song 2',
    version: 'Test Version',
  },
];

describe('fetchSongs', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch songs', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockSongs[0]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockSongs[1]),
      });

    const response = await fetchSongs([1, 2]);
    expect(response).toEqual(expectedOutput);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/songs/1');
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/songs/2');
  });

  it('should return "Song not found" if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await fetchSongs([6]);
    expect(result).toEqual(['Song not found']);
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching song with id 6', expect.any(Error));
  });

  // TODO: Following test is not working. Need to fix it.
  // It returns the array ['Song not found', 'Song not found'] instead of an empty array. Not sure if this is a mocking issue or a code issue.

  // it('should return an empty array if the Promise.all statement fails', async () => {
  //   global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

  //   const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  //   const result = await fetchSongs([1, 2]);
  //   expect(result).toEqual([]);
  //   expect(consoleSpy).toHaveBeenCalledWith('Error fetching songs', expect.any(Error));
  //   consoleSpy.mockRestore();
  // });
});
