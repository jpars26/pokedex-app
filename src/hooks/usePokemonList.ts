// src/hooks/usePokemonList.ts
import { useState, useEffect } from 'react';
import { fetchPokemons, Pokemon } from '../services/pokeapi';

export function usePokemonList(limit = 150) {
  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPokemons(limit)
      .then(setList)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [limit]);

  return { list, loading, error };
}
