import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonDetails} from '../interfaces/pokemons';

export const usePokemonDetails = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PokemonDetails>({} as PokemonDetails);

  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

  const getDetails = async () => {
    try {
      setLoading(true);
      const res: PokemonDetails = await pokemonApi.get(url).then(r => r.data);
      setData(res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
  };
};
