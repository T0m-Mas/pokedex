import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {SimplePokemon, PokemonResponsePaginated} from '../interfaces/pokemons';

export const usePokemons = () => {
  const [simpleList, setSimpleList] = useState<SimplePokemon[]>([]);

  const [loading, setLoading] = useState(true);
  const urlRef = useRef('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const imgUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  const getPokemons = async () => {
    try {
      setLoading(true);
      const res: PokemonResponsePaginated = await pokemonApi
        .get(urlRef.current)
        .then(r => r.data);
      urlRef.current = res.next;
      let newPokeArray: SimplePokemon[] = [];
      res.results.map(({name, url}) => {
        const id = url.split('/')[6];
        newPokeArray.push({
          id,
          name,
          picture: `${imgUrl}${id}.png`,
          url,
        });
      });
      setSimpleList([...simpleList, ...newPokeArray]);
      // console.log(simpleList);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getPokemons,
    simpleList,
    loading,
  };
};
