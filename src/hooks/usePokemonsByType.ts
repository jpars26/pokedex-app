import { useState, useEffect } from 'react';

export type Pokemon = { name: string; url: string };

export function usePokemonsByType(typeName: string) {
  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!typeName) return;
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then(res => res.json())
      .then(json => {
        const pokemons = (json.pokemon as Array<{ pokemon: Pokemon }>)
          .map(entry => entry.pokemon);
        setList(pokemons);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [typeName]);

  return { list, loading, error };
}
