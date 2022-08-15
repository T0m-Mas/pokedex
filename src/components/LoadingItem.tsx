import React, {useRef} from 'react';
import {Animated, Easing, View} from 'react-native';

export const LoadingItem = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const pokeball = require('../assets/pokebola-blanca.png');

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
  return (
    <View>
      <Animated.Image
        source={pokeball}
        style={{
          width: 36,
          height: 36,
          transform: [
            {
              rotate: spin,
            },
          ],
        }}
      />
    </View>
  );
};
