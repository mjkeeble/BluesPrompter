import { TSong } from 'src/types';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchScreenSplit, fetchSong } from '../utils';

const mockSong: TSong = {
  id: 1,
  title: 'Test Song',
  writtenBy: ['Test Writer'],
  pages: [],
};

describe('fetchScreenSplit', () => {
  it('should return 1 if page has no chords', () => {
    expect(fetchScreenSplit(6, false)).toBe(1);
  });

  it('should return screenSplit if page has chords', () => {
    expect(fetchScreenSplit(6, true)).toBe(6);
  });
});

describe('fetchSong', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch a song', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockSong),
    });

    const response = await fetchSong(1);
    expect(response).toEqual(mockSong);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/songs/1');
  });

  it('should return null if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await fetchSong(1);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching song', expect.any(Error));
  });
});
