// src/screens/TypeListScreen.tsx
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { usePokemonsByType, Pokemon } from '../hooks/usePokemonsByType';

type Props = NativeStackScreenProps<RootStackParamList, 'TypeList'>;

export function TypeListScreen({ navigation, route }: Props) {
  const { type } = route.params;
  const { list, loading, error } = usePokemonsByType(type);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)   return <Text style={styles.center}>Erro ao carregar Pokémons</Text>;

  // Função para extrair o ID da URL
  const getIdFromUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return Number(parts[parts.length - 1]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={item => item.name}
        renderItem={({ item }) => {
          const id = getIdFromUrl(item.url);
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Details', { id })}
            >
              <Text style={styles.text}>
                {`${id}. ${item.name.toUpperCase()}`}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 50 },
  center:    { flex: 1, textAlign: 'center', marginTop: 20 },
  item:      {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  text:      { fontSize: 16 }
});
