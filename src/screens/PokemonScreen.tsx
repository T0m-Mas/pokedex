import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Easing,
} from 'react-native';
import {RootStackParams} from '../navigator/StackNavigator';
import {PokeHeader} from '../components/PokeHeader';
import {useEffect} from 'react';
import {ThemeContext} from '../context/Theme/ThemeContex';
import {LoadingItem} from '../components/LoadingItem';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {usePokemonDetails} from '../hooks/usePokemonDetails';
import {useRef} from 'react';
import {PokeTypes} from '../components/PokeTypes';
import {PokeStats} from '../components/PokeStats';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({
  route: {
    params: {simplePokemon, color},
  },
}: Props) => {
  const {
    theme: {
      colors: {card, background},
    },
  } = useContext(ThemeContext);
  SystemNavigationBar.setNavigationColor(color);

  const {height} = useWindowDimensions();

  const moveIn = useRef(new Animated.Value(height)).current;
  useEffect(() => {
    Easing.bounce(4);
    Animated.timing(moveIn, {
      toValue: {x: 0, y: 0},
      duration: 800,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(moveIn, {
        toValue: {x: 0, y: height},
        duration: 800,
        useNativeDriver: true,
      }).start();
      SystemNavigationBar.setNavigationColor(background);
      SystemNavigationBar.lightNavigationBar(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data, loading} = usePokemonDetails(simplePokemon.id);

  return (
    <Animated.View
      style={{
        backgroundColor: card,
        height: height + 700,
        transform: [
          {
            translateY: moveIn,
          },
        ],
      }}>
      <PokeHeader pokemon={simplePokemon} color={color} />
      <View style={styles.pokeView}>
        <Text style={styles.name}>{simplePokemon.name.toUpperCase()}</Text>
        {loading && (
          <View>
            <LoadingItem />
          </View>
        )}
        {!loading && (
          <>
            <PokeTypes types={data.types} />
            <View style={styles.hwView}>
              <View style={styles.hwRow}>
                <Text style={{color: '#444444', opacity: 0.8}}>Weight: </Text>
                <Text style={{color: '#444444', opacity: 0.8}}>
                  {data.weight}kg
                </Text>
              </View>
              <View style={styles.hwRow}>
                <Text style={{color: '#444444', opacity: 0.8}}>Height: </Text>
                <Text style={{color: '#444444', opacity: 0.8}}>
                  {data.height}'
                </Text>
              </View>
            </View>
            <PokeStats stats={data.stats} color={color} />
          </>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hwRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hwView: {
    marginTop: 10,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pokeView: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  name: {
    color: '#444444',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: -10,
  },
});
