import React, {createContext, useReducer, useState} from 'react';
import {themeReducer, ThemeState} from './ThemeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  isLoading: Boolean;
  setDefaultTheme: () => void;
  setPokeTheme: ({color}: {color: string}) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

// const pokeTheme: ThemeState = {
//   currentTheme: 'light',
//   dark: false,
//   colors: {
//     primary: '#de2d2d',
//     background: '#ff4444',
//     card: '#dbdbdb',
//     text: 'white',
//     border: 'orange',
//     notification: 'purple',
//     inactive: '#403f3e',
//   },
// };
const defaultTheme: ThemeState = {
  currentTheme: 'light',
  dark: true,
  colors: {
    primary: '#de2d2d',
    background: '#ff4444',
    card: '#dbdbdb',
    text: 'white',
    border: 'orange',
    notification: 'purple',
    inactive: '#403f3e',
    statusBar: '#ff4444',
    navBar: '#ff4444',
  },
};

export const ThemeProvider = ({children}: any) => {
  const [theme, dispatch] = useReducer(themeReducer, defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  const setDefaultTheme = () => {
    setIsLoading(true);
    dispatch({type: 'set_theme', payload: defaultTheme});
    setIsLoading(false);
  };

  const setPokeTheme = ({color}: {color: string}) => {
    setIsLoading(true);
    dispatch({
      type: 'set_theme',
      payload: {
        currentTheme: 'light',
        dark: false,
        colors: {
          primary: color,
          background: '#dbdbdb',
          card: '#dbdbdb',
          text: 'white',
          border: 'orange',
          notification: 'purple',
          inactive: '#403f3e',
          statusBar: color,
          navBar: '#dbdbdb',
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <ThemeContext.Provider
      value={{theme, isLoading, setDefaultTheme, setPokeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
