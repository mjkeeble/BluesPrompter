import { Song } from 'src/types';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchSongs } from '../utils';

const mockSongs: Song[] = [
  {
    id: '1',
    act_id: 'Test Act',
    title: 'Test Song',
    writtenBy: ['Test Writer'],
    pages: [],
  },
  {
    id: '2',
    act_id: 'Test Act',
    title: 'Test Song 2',
    writtenBy: ['Test Writer 2'],
    pages: [],
  },
];

describe('fetchSongs', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch songs', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockSongs),
    });

    const response = await fetchSongs();
    expect(response).toEqual(mockSongs);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/songs');
  });

  it('should return null if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await fetchSongs();
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching songs', expect.any(Error));
  });
});
