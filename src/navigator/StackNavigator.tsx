import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {HomeScreen} from '../screens/HomeScreen';
import {PokemonScreen} from '../screens/PokemonScreen';
import {ThemeContext} from '../context/Theme/ThemeContex';
import {SimplePokemon} from '../interfaces/pokemons';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
};
const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {
  const {theme} = useContext(ThemeContext);
  SystemNavigationBar.setNavigationColor(theme.colors.background);
  SystemNavigationBar.lightNavigationBar(true);
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationEnabled: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
