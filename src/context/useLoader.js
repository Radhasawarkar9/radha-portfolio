import { useContext } from 'react';
import LoaderContext from './LoaderContext.js';

export default function useLoader() {
  return useContext(LoaderContext);
}
