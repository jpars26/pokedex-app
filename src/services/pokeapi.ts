// src/services/pokeapi.ts
export type Pokemon = { name: string; url: string };

export async function fetchPokemons(limit = 150): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const json = await res.json();
  return json.results as Pokemon[];
}
