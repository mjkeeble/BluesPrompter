import { createContext } from 'react';
import { Gig, Setlist } from 'src/types';

interface GigContextType {
  gig: Gig | undefined;
  setGig: (gig: Gig) => void;
  setlist: Setlist;
}

export const GigContext = createContext<GigContextType | undefined>(undefined);
