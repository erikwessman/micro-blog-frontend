import light from './light';
import dark from './dark';
import sun from './sun';
import { Theme } from '@mui/material';

interface ITheme {
    [key: string]: Theme
}

const themes: ITheme = {
  'light': light,
  'dark': dark,
  'sun': sun
}

export default function getTheme(theme: string) {
  return themes[theme]
}