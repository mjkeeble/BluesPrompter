import { createContext } from 'react';
import { TConfig } from 'src/types';

export const ConfigContext = createContext<TConfig | null>(null);
