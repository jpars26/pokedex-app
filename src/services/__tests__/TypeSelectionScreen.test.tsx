import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TypeSelectionScreen } from '../../screens/TypeSelectionScreen';

// mock hook pra não depender de rede
jest.mock('../../hooks/usePokemonTypes', () => ({
  usePokemonTypes: () => ({
    types: [
      { name: 'fire', url: '' },
      { name: 'water', url: '' },
    ],
    loading: false,
    error: null
  })
}));

describe('TypeSelectionScreen', () => {
  const navigate = jest.fn();
  const props = { navigation: { navigate } } as any;

  beforeEach(() => {
    navigate.mockClear();
  });

  it('deve renderizar os ícones e navegar ao clicar', async () => {
    const { getByText } = render(<TypeSelectionScreen {...props} />);
    
    // Verifica se os tipos estão sendo renderizados
    expect(getByText('fire')).toBeTruthy();
    expect(getByText('water')).toBeTruthy();

    // Simula o clique no primeiro tipo
    const fireButton = getByText('fire');
    fireEvent.press(fireButton);
    
    expect(navigate).toHaveBeenCalledWith('TypeList', { type: 'fire' });
  });
});
