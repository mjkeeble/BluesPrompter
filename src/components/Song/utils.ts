import { TSong } from 'src/types';

export const fetchScreenSplit = (
  screenSplit: number | undefined,
  pageHasChords: boolean,
): number => {
  return !pageHasChords ? 1 : Number(screenSplit || 6);
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
