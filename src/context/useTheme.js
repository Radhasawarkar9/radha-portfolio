import { useContext } from 'react';
import ThemeContext from './ThemeContext.js';

export default function useTheme() {
  return useContext(ThemeContext);
}
