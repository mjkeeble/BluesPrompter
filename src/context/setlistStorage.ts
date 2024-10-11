import {TSetlist} from 'src/types';

const LOCAL_STORAGE_KEY = 'SETLIST';

export const storeSetlist = (setlist: TSetlist) => {
  window.sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setlist));
};

export const getSetlist = (): TSetlist  => {
  const setlist = window.sessionStorage.getItem(LOCAL_STORAGE_KEY);
  return setlist ? JSON.parse(setlist) : [];
}
