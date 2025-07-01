// ConfigContext.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { Config } from 'src/types';
import { ConfigContext } from './configContextDefinition';

interface ConfigProviderProps {
  children: ReactNode;
}

const fetchConfig = async (): Promise<Config[] | null> => {
  try {
    const response = await fetch('http://localhost:3000/config');
    return await response.json();
  } catch (error) {
    console.error('Error fetching config', error);
    return null;
  }
};

export const ConfigContextProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const configData = await fetchConfig();
        if (configData) {
          setConfig(configData[0]);
        } else {
          setConfig(null);
        }
      } catch (error) {
        console.error('Failed to fetch config', error);
      }
    };

    getConfig();
  }, []);

  if (!config) {
    return <div>Loading configuration...</div>;
  }

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
