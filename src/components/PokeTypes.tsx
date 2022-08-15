import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import {Type} from '../interfaces/pokemons';

export const PokeTypes = ({types}: {types: Type[]}) => {
  return (
    <FlatList
      data={types}
      horizontal
      style={styles.view}
      renderItem={({item}) => {
        return <Text style={styles.text}>{item.type.name}</Text>;
      }}
      keyExtractor={item => item.type.name}
      ItemSeparatorComponent={() => <Text style={styles.text}>{' - '}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    maxWidth: '60%',
    flexDirection: 'row',
  },
  text: {
    color: '#444444',
    fontSize: 18,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
