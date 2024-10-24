import {TSong} from 'src/types';
import config from '../../../data/config.json';

export const fetchScreenSplit = (
  screenSplitSettingForSong: number | undefined,
  pageHasChords: boolean,
  pageHasLyrics: boolean,
): number => {
  if (!pageHasChords && !pageHasLyrics) {
    return screenSplitSettingForSong || Number(config.chordPaneSize);
  }
  if (!pageHasChords) return 1;

  if (!pageHasLyrics) return Number(config.chordPaneSize) || 8;

  return Number(screenSplitSettingForSong || config.chordPaneSize || 6);
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
