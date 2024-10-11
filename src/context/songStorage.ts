import {TSong} from 'src/types';

const LOCAL_STORAGE_KEY = 'SONGS';

export const storeSongs = (songs: TSong[]) => { 
  window.sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(songs));
}

export const getSongs = (): TSong[] => {
  const songs = window.sessionStorage.getItem(LOCAL_STORAGE_KEY);
  return songs ? JSON.parse(songs) : [];
}
