import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
type PokemonDetails = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

export default function DetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [data, setData] = useState<PokemonDetails | null>(null);

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(poke => {
        setData(poke);
        // salva no AsyncStorage
        AsyncStorage.setItem(
            '@lastPokemon',
            JSON.stringify({ id, name: poke.name })
        );
        })
        .catch(console.error);
    }, [id]);

  if (!data) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, textTransform: 'capitalize' }}>{data.name}</Text>
      <Image source={{ uri: data.sprites.front_default }} style={{ width: 150, height: 150 }} />
      <Text>Tipos:</Text>
      {data.types.map(t => (
        <Text key={t.type.name}>{t.type.name}</Text>
      ))}
      <Text>Stats:</Text>
      {data.stats.map(s => (
        <Text key={s.stat.name}>{`${s.stat.name}: ${s.base_stat}`}</Text>
      ))}
    </ScrollView>
  );
}
