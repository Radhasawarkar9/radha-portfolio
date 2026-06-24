import { createContext } from 'react';

const LoaderContext = createContext({
  appReady: false,
  playKey: 0,
  markReady: () => {},
  replayLoader: () => {},
});

export default LoaderContext;
