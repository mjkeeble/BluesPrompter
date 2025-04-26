import { createContext } from 'react';
import { TGig, TSetlist } from 'src/types';

interface GigContextType {
  gig: TGig | undefined;
  setGig: (gig: TGig) => void;
  setlist: TSetlist;
}

export const GigContext = createContext<GigContextType | undefined>(undefined);
