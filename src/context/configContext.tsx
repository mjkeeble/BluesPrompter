// ConfigContext.tsx
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { TConfig } from 'src/types';

interface ConfigProviderProps {
  children: ReactNode;
}

const fetchConfig = async (): Promise<TConfig[] | null> => {
  try {
    const response = await fetch('http://localhost:3000/config');
    return await response.json();
  } catch (error) {
    console.error('Error fetching config', error);
    return null;
  }
};

export const ConfigContext = createContext<TConfig | null>(null);

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<TConfig | null>(null);

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
    return <div>Loading config...</div>;
  }

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
