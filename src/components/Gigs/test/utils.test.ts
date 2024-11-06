import {describe, expect, it, vi} from 'vitest';
import { getDateBasedStyling, fetchGigs } from '..//utils';
import {TGig} from 'src/types';

const mockGigs:TGig[] = [
  {
    id: '1',
    venue: 'Test Venue',
    town: 'Test Town',
    dateTime: new Date().toISOString(),
    setlist: [[]],
  },
  {
    id: '2',
    venue: 'Test Venue 2',
    town: 'Test Town 2',
    dateTime: new Date().toISOString(),
    setlist: [[]],
  },
];

describe('getDateBasedStyling', () => {
  it('should return correct styling based on date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(getDateBasedStyling(pastDate.toISOString())).toBe('bg-bj-blue-light text-bj-blue-mid');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(getDateBasedStyling(futureDate.toISOString())).toBe('bg-bj-blue-dark text-bj-blue-light');

    expect(getDateBasedStyling(new Date().toISOString())).toBe('bg-bj-green-mid font-bold');
  });
});

describe('fetchGigs', () => {
  it('should fetch gigs', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockGigs),
    });

    const response = await fetchGigs();
    expect(response).toEqual(mockGigs);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/gigs');
  });

  it('should return null if fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fetch error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await fetchGigs();
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching gigs', expect.any(Error));
  });
});
