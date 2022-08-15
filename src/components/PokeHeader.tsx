import React from 'react';
import {View, useWindowDimensions, Image} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {SimplePokemon} from '../interfaces/pokemons';

export const PokeHeader = ({
  pokemon,
  color,
}: {
  pokemon: SimplePokemon;
  color: string;
}) => {
  const {width, height} = useWindowDimensions();

  return (
    <>
      <View
        style={{
          width: width,
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/pokebola.png')}
          style={{
            width: width * 0.5,
            height: width * 0.5,
            bottom: height * 0.02,
            opacity: 0.5,
            position: 'absolute',
            transform: [{rotate: '180deg'}],
            zIndex: 99,
          }}
        />
        <Image
          source={{uri: pokemon.picture}}
          style={{
            width: width * 0.6,
            height: width * 0.6,
            bottom: height * 0.02,
            position: 'absolute',
            zIndex: 99,
          }}
        />
        <DropShadow
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: width,
              backgroundColor: color,
              height: height * 0.2,
              borderRadius: 0,
            }}
          />
          <View
            style={{
              width: width * 0.6,
              backgroundColor: color,
              height: height * 0.16,
              borderBottomRightRadius: 500,
              borderBottomLeftRadius: 500,
            }}
          />
        </DropShadow>
      </View>
    </>
  );
};
