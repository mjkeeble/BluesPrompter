import { NavigateFunction } from 'react-router-dom';
import { Song } from 'src/types';

export const fetchScreenSplit = (screenSplit: number | undefined, pageHasChords: boolean): number => {
  return !pageHasChords ? 0 : Number(screenSplit || 6);
};

export const fetchSong = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/songs/${id}`);
    const data: Song = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching song', error);
    return null;
  }
};

export const goto = {
  previousPage: (currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>): void => {
    setCurrentPage(currentPage - 1);
  },

  nextPage: (currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>): void => {
    setCurrentPage(currentPage + 1);
  },

  titlePage: (setCurrentPage: React.Dispatch<React.SetStateAction<number>>): void => {
    setCurrentPage(0);
  },

  previousSong: (currentSong: number, Navigate: NavigateFunction): void => {
    Navigate(`/song/${Math.max(currentSong - 1, 0)}`);
  },

  nextSong: (currentSong: number, Navigate: NavigateFunction): void => {
    Navigate(`/song/${currentSong + 1}`);
  },

  repertoire: (Navigate: NavigateFunction): void => {
    Navigate('/repertoire');
  },

  setList: (Navigate: NavigateFunction): void => {
    Navigate('/setlist');
  },

  gigList: (Navigate: NavigateFunction): void => {
    Navigate('/');
  },

  toggleTimerFreeze: (timerHalted: boolean, setTimerHalted: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setTimerHalted(!timerHalted);
  },
};
