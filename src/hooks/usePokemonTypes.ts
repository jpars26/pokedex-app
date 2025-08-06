import { useState, useEffect } from 'react';

export type PokemonType = { name: string; url: string };

export function usePokemonTypes() {
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/type')
      .then(res => res.json())
      .then(json => setTypes(json.results as PokemonType[]))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { types, loading, error };
}
