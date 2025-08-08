// src/screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { typeIcons } from '../utils/typeIcons'; // mapeamento name → require(...)

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
type PokemonDetails = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

const BAR_WIDTH = Dimensions.get('window').width * 0.6;
const MAX_STAT = 200;

export default function DetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [data, setData] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(poke => {
        setData(poke);
        AsyncStorage.setItem('@lastPokemon', JSON.stringify({ id, name: poke.name }));
      })
      .catch(console.error);
  }, [id]);

  if (!data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Nome e imagem */}
      <Text style={styles.name}>{data.name}</Text>
      <Image source={{ uri: data.sprites.front_default }} style={styles.sprite} />

      {/* Tipos como ícones */}
      <View style={styles.typesContainer}>
        {data.types.map(t => (
          <Image
            key={t.type.name}
            source={typeIcons[t.type.name]}
            style={styles.typeIcon}
          />
        ))}
      </View>

      {/* Stats com barras */}
      <View style={styles.statsContainer}>
        {data.stats.map(s => (
          <View key={s.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{s.stat.name.toUpperCase()}</Text>
            <View style={styles.statBarBackground}>
              <View
                style={[
                  styles.statBarFill,
                  { width: `${Math.min(s.base_stat, MAX_STAT) * 100 / MAX_STAT}%` },
                ]}
              />
            </View>
            <Text style={styles.statValue}>{s.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 12,
  },
  sprite: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
  },
  statsContainer: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
  },
  statBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  statValue: {
    width: 30,
    fontSize: 12,
    textAlign: 'right',
    fontWeight: '600',
  },
});
