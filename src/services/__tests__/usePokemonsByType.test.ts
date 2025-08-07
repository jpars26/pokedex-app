// src/services/__tests__/usePokemonsByType.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { usePokemonsByType } from '../../hooks/usePokemonsByType';

// Mock da fetch API
global.fetch = jest.fn();

describe('usePokemonsByType', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('deve buscar pokémons do tipo especificado', async () => {
    const apiResponse = {
      pokemon: [
        { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } }
      ]
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => apiResponse
    });

    // Testando o hook
    const { result } = renderHook(() => usePokemonsByType('fire'));

    // Verificando se o loading está correto inicialmente
    expect(result.current.loading).toBe(true);

    // Espera a atualização do hook
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verificando o estado final
    expect(result.current.list).toEqual([{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }]);
  });
});
