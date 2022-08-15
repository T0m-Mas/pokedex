import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {usePokemons} from '../hooks/usePokemons';
import {LoadingItem} from './LoadingItem';
import {PokeItem} from './PokeItem';
import {ThemeContext} from '../context/Theme/ThemeContex';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const PokeList = () => {
  const {simpleList, getPokemons} = usePokemons();
  const {
    theme: {
      colors: {text},
    },
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

  return (
    <FlatList
      numColumns={2}
      data={simpleList}
      renderItem={({item}) => <PokeItem item={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <Text style={{...styles.title, marginTop: top, color: text}}>
          Pokédex
        </Text>
      }
      ListFooterComponentStyle={{alignItems: 'center', padding: 5}}
      ListFooterComponent={<LoadingItem />}
      onEndReached={getPokemons}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'center',
  },
});
