import { createContext } from 'react';
import { Config } from 'src/types';

export const ConfigContext = createContext<Config | null>(null);
