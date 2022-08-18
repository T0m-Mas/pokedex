import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {SimplePokemon} from '../interfaces/pokemons';
import {useState, useRef, useEffect} from 'react';
import {LoadingItem} from './LoadingItem';
import ImageColors from 'react-native-image-colors';
import {ReadableBackgroundColor} from '@radicalcondor/react-native-background-readable-color';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import DropShadow from 'react-native-drop-shadow';

export const PokeItem = ({
  item: {name, id, picture, url},
}: {
  item: SimplePokemon;
}) => {
  const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

  const isMounted = useRef(true);
  const [bgColor, setBgColor] = useState('#868686');
  const [loading, setLoading] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    ImageColors.getColors(picture).then(colors => {
      if (!isMounted.current) {
        return;
      }
      switch (colors.platform) {
        case 'android':
          setBgColor(colors.dominant || 'cyan');
          return;
        case 'ios':
          setBgColor(colors.background || 'cyan');
          return;
      }
    });
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loaded = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigator.navigate('PokemonScreen', {
          simplePokemon: {name, id, picture, url},
          color: bgColor,
        });
      }}
      activeOpacity={0.8}>
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}>
        <View
          style={{
            ...styles.container,
            backgroundColor: bgColor,
            width: width * 0.42,
            height: height * 0.16,
            borderRadius: width * 0.02,
            borderBottomRightRadius: width * 0.25,
          }}>
          <ReadableBackgroundColor
            backgroundColor={bgColor}
            render={(color?: string) => (
              <Text
                style={{
                  color,
                  fontSize: width * 0.05,
                  marginLeft: 10,
                  opacity: 0.4,
                  fontWeight: '900',
                }}>
                {name.toUpperCase()}
              </Text>
            )}
          />
          <ReadableBackgroundColor
            backgroundColor={bgColor}
            render={(color?: string) => (
              <Text
                style={{
                  position: 'absolute',
                  color,
                  bottom: 0,
                  left: -8,
                  fontSize: width * 0.18,
                  marginLeft: 10,
                  opacity: 0.2,
                  fontWeight: '900',
                }}>
                {id.toUpperCase()}
              </Text>
            )}
          />

          <Animated.Image
            onLoad={loaded}
            source={{uri: picture, scale: 0.3}}
            style={{
              width: loading ? 0 : width * 0.3,
              height: loading ? 0 : width * 0.3,
              opacity,
              position: 'absolute',
              right: -10,
              bottom: -10,
            }}
          />
          {loading && (
            <View
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}>
              <LoadingItem />
            </View>
          )}
        </View>
      </DropShadow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  name: {
    position: 'absolute',
    width: '100%',
    opacity: 1,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  number: {
    position: 'absolute',
    fontSize: 50,
    opacity: 0.5,
    fontWeight: 'bold',
    color: 'white',
  },
});
