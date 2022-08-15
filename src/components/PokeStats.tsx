import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Stat} from '../interfaces/pokemons';

export const PokeStats = ({stats, color}: {stats: Stat[]; color: string}) => {
  return (
    <>
      <View style={{...styles.view, borderColor: color}}>
        <View style={{...styles.header, backgroundColor: color}}>
          <Text style={styles.textHeader}>STATS</Text>
        </View>
        {stats.map(({base_stat, stat: {name}}) => {
          return (
            <View key={name} style={styles.row}>
              <Text style={styles.text}>
                {name.replace('-', ' ').toUpperCase()}
              </Text>
              <Text style={styles.text}>{base_stat}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 20,
    maxWidth: '80%',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#444444',
    paddingHorizontal: 5,
    fontSize: 14,
    opacity: 0.8,
  },
  textHeader: {
    color: 'white',
    fontSize: 16,
    opacity: 1,
    fontWeight: 'bold',
  },
});
