import { TGig } from '../../types';

export const getDateBasedStyling = (date: string): string => {
  const gigDate = new Date(date).setHours(0, 0, 0, 0);
  const now = new Date().setHours(0, 0, 0, 0);

  if (gigDate < now) return 'bg-bj-blue-light text-bj-blue-mid';
  if (gigDate > now) return 'bg-bj-blue-dark text-bj-blue-light';
  return 'bg-bj-green-mid font-bold';
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
