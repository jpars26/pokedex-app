import { fetchPokemons } from '../pokeapi';

// Mock global do fetch
global.fetch = jest.fn();

describe('fetchPokemons', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('deve buscar a lista e retornar os resultados', async () => {
    const mock = { results: [{ name: 'pikachu', url: 'u1' }] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mock
    });

    const pokes = await fetchPokemons(1);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1');
    expect(pokes).toEqual(mock.results);
  });

  it('deve buscar a lista com o limite padrão', async () => {
    const mock = { results: [{ name: 'pikachu', url: 'u1' }] };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mock
    });

    const pokes = await fetchPokemons();
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=150');
    expect(pokes).toEqual(mock.results);
  });

  it('deve tratar erros na busca', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchPokemons(1)).rejects.toThrow('Network error');
  });

  it('deve tratar erros na conversão de resposta', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => { throw new Error('JSON parse error'); }
    });

    await expect(fetchPokemons(1)).rejects.toThrow('JSON parse error');
  });
});