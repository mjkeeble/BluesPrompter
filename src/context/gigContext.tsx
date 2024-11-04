import { createContext, ReactNode, useState } from 'react';
import { TGig, TSetlist } from 'src/types';
import { flattenSetlist } from 'src/utils';

interface ConfigProviderProps {
  children: ReactNode;
}

interface GigContextType {
  gig: TGig | undefined;
  setGig: (gig: TGig) => void;
  setlist: TSetlist;
}

export const GigContext = createContext<GigContextType | undefined>(undefined);

export const GigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [gig, setGig] = useState<TGig>();

  return (
    <GigContext.Provider value={{ gig, setGig, setlist: gig ? flattenSetlist(gig.setlist) : [] }}>
      {children}
    </GigContext.Provider>
  );
};
