import React from 'react';
import Navigator from './src/navigator/StackNavigator';
import {ThemeProvider} from './src/context/Theme/ThemeContex';
import {StatusBar} from 'react-native';
import {Tabs} from './src/navigator/TabNavigator';
const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ThemeProvider>
        <Tabs />
        {/* <Navigator /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
