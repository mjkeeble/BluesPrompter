import config from '../../../data/config.json';

export const getScreenSplit = (
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
