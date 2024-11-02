import { TSong } from 'src/types';

export const fetchScreenSplit = (
  screenSplit: number | undefined,
  pageHasChords: boolean,
  pageHasLyrics: boolean,
): number => {
  if (!pageHasChords && !pageHasLyrics) {
    return screenSplit || 2;
  }
  if (!pageHasChords) return 1;

  if (!pageHasLyrics) return 8;

  return Number(screenSplit || 6);
};

export const fetchSong = async (id: number) => {
  try {
    const response: TSong = await (await fetch(`http://localhost:3000/songs/${id}`)).json();
    return response;
  } catch (error) {
    console.error('Error fetching song', error);
    return null;
  }
};
