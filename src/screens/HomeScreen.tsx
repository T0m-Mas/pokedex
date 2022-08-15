import React, {useContext, useRef} from 'react';
import {View, useWindowDimensions, Animated, Easing} from 'react-native';
import {PokeList} from '../components/PokeList';
import {ThemeContext} from '../context/Theme/ThemeContex';

export const HomeScreen = () => {
  const {
    theme: {
      colors: {background},
    },
  } = useContext(ThemeContext);

  const pokeball = require('../assets/pokebola-blanca.png');

  const {width, height} = useWindowDimensions();
  const rotation = useRef(new Animated.Value(0)).current;

  const spin = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 360,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  return (
    <View
      style={{
        backgroundColor: background,
        alignItems: 'center',
        flex: 1,
      }}>
      <Animated.Image
        source={pokeball}
        style={{
          position: 'absolute',
          top: height * 0.45,
          left: width * 0.2,
          width: width * 1.3,
          height: width * 1.3,
          opacity: 0.5,
          transform: [
            {
              rotate: spin,
            },
          ],
        }}
      />
      <PokeList />
    </View>
  );
};
