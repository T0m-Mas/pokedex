import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import {SearchScreen} from '../screens/SearchScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeContext} from '../context/Theme/ThemeContex';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const {
    theme: {
      colors: {background, card, primary},
    },
  } = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: card,
          tabBarStyle: {
            backgroundColor: background,
          },
        }}
        sceneContainerStyle={{backgroundColor: primary}}>
        <Tab.Screen name="Pokédex" component={StackNavigator} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
