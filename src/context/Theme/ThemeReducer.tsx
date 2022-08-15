import {Theme} from '@react-navigation/native';

type ThemeAction = {type: 'set_theme'; payload: ThemeState};

export interface ThemeState extends Theme {
  currentTheme: 'light' | 'dark';
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    inactive: string;
    statusBar: string;
    navBar: string;
  };
}

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction,
): ThemeState => {
  switch (action.type) {
    case 'set_theme':
      return action.payload;
    default:
      return state;
  }
};
