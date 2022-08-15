import React from 'react';
import Navigator from './src/navigator/StackNavigator';
import {ThemeProvider} from './src/context/Theme/ThemeContex';
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </>
  );
};

export default App;
