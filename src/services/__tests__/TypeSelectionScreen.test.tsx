// src/services/__tests__/TypeSelectionScreen.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TypeSelectionScreen } from '../../screens/TypeSelectionScreen';

jest.mock('../../hooks/usePokemonTypes', () => ({
  usePokemonTypes: () => ({
    types: [
      { name: 'fire', url: '' },
      { name: 'water', url: '' },
    ],
    loading: false,
    error: null,
  })
}));

describe('TypeSelectionScreen', () => {
  const navigate = jest.fn();
  const props = { navigation: { navigate } } as any;

  beforeEach(() => {
    navigate.mockClear();
  });

  it('renderiza título e navega ao clicar nos ícones', () => {
    const { getByText, getByTestId } = render(
      <TypeSelectionScreen {...props} />
    );

    // 1) Verifica título
    expect(getByText('Escolha o tipo do Pokémon')).toBeTruthy();

    // 2) Clica no botão com testID "type-fire"
    const fireButton = getByTestId('type-fire');
    fireEvent.press(fireButton);
    expect(navigate).toHaveBeenCalledWith('TypeList', { type: 'fire' });

    // 3) Clica no botão "type-water"
    const waterButton = getByTestId('type-water');
    fireEvent.press(waterButton);
    expect(navigate).toHaveBeenCalledWith('TypeList', { type: 'water' });
  });
});
