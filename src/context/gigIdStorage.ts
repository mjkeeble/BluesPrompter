const LOCAL_STORAGE_KEY = 'GIG_ID';

export const storeGigId = (id: string) => {
  window.sessionStorage.setItem(LOCAL_STORAGE_KEY, id);
};

export const getGigId = (): string => {
  const gigId = window.sessionStorage.getItem(LOCAL_STORAGE_KEY);
  return gigId ? gigId : '';
};
