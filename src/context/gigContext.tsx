import { createContext, ReactNode, useEffect, useState } from 'react';
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
  const [gig, setGigState] = useState<TGig | undefined>(() => {
    const storedGig = localStorage.getItem('gig');
    return storedGig ? JSON.parse(storedGig) : undefined;
  });

  const setGig = (newGig: TGig) => {
    setGigState(newGig);
    localStorage.setItem('gig', JSON.stringify(newGig));
  };

  useEffect(() => {
    const storedGig = localStorage.getItem('gig');
    if (storedGig) {
      setGigState(JSON.parse(storedGig));
    }
  }, []);

  return (
    <GigContext.Provider value={{ gig, setGig, setlist: gig ? flattenSetlist(gig.setlist) : [] }}>
      {children}
    </GigContext.Provider>
  );
};
