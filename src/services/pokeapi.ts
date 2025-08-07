// src/services/pokeapi.ts
export type Pokemon = { name: string; url: string };

export async function fetchPokemons(limit = 150): Promise<Pokemon[]> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    return json.results as Pokemon[];
  } catch (error) {
    throw error;
  }
}
