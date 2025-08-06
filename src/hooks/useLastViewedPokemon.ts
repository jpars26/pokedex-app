// src/hooks/useLastViewedPokemon.ts
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LastViewed = { id: number; name: string } | null;

export function useLastViewedPokemon(storageKey = '@lastPokemon') {
  const [last, setLast] = useState<LastViewed>(null);

  const refresh = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(storageKey);
      if (json) setLast(JSON.parse(json));
    } catch (err) {
      console.error(err);
    }
  }, [storageKey]);

  return { last, refresh };
}
