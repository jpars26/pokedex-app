// src/screens/TypeListScreen.tsx
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { usePokemonsByType, Pokemon } from '../hooks/usePokemonsByType';
import { typeIcons } from '../utils/typeIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TypeList'>;

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 80;

export function TypeListScreen({ navigation, route }: Props) {
  const { type } = route.params;
  const { list, loading, error } = usePokemonsByType(type);

  // extrai ID da URL
  const getIdFromUrl = (url: string) =>
    Number(url.split('/').filter(Boolean).pop());

  if (loading)
    return <ActivityIndicator style={styles.center} size="large" />;
  if (error)
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar Pokémons</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* ─── Header com icon e nome do tipo ─── */}
      <View style={styles.header}>
        <Image source={typeIcons[type]} style={styles.typeIconLarge} />
        <Text style={styles.headerText}>{type.toUpperCase()}</Text>
      </View>

      {/* ─── Lista de Pokémons ─── */}
      <FlatList
        data={list}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const id = getIdFromUrl(item.url);
          const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', { id })}
            >
              <Image source={{ uri: spriteUrl }} style={styles.pokemonImage} />
              <Text style={styles.cardText}>
                #{id} {item.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  typeIconLarge: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ITEM_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  pokemonImage: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
