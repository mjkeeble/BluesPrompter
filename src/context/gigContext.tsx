import { ReactNode, useEffect, useState } from 'react';
import { TGig } from 'src/types';
import { flattenSetlist } from 'src/utils';
import { GigContext } from './gigContextDefinition';

interface ConfigProviderProps {
  children: ReactNode;
}

export const GigContextProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [gig, setGigState] = useState<TGig | undefined>(() => {
    const storedGig = localStorage.getItem('gig');
    return storedGig ? JSON.parse(storedGig) : undefined;
  });

  const setGig = (newGig: TGig) => {
    console.info('Setting gig:', newGig);
    setGigState(newGig);
    localStorage.setItem('gig', JSON.stringify(newGig));
    console.info('Gig saved to localStorage:', localStorage.getItem('gig'));
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
