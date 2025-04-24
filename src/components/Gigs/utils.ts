import { TGig } from 'src/types';

export const getDateBasedStyling = (date: string): string => {
  const gigDate = new Date(date).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);

  if (gigDate !== now) return 'text-bj-white border border-bj-white';
  return 'bg-bj-blue-light text-bj-blue-mid font-bold';
};

export const fetchGigs = async (): Promise<TGig[] | null> => {
  try {
    const response: TGig[] = await (await fetch('http://localhost:3000/gigs')).json();
    return response;
  } catch (error) {
    console.error('Error fetching gigs', error);
    return null;
  }
};
