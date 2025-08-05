// src/screens/HomeScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TabParamList, RootStackParamList } from '../navigation';

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Last = { id: number; name: string } | null;
type Pokemon = { name: string; url: string };

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  const [last, setLast] = useState<Last>(null);
  const [list, setList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 1) Busca último visto TODA VEZ que a tela recebe foco:
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('@lastPokemon')
        .then(value => {
          if (value) {
            setLast(JSON.parse(value));
          }
        })
        .catch(console.error);
    }, [])
  );

  // 2) Carrega a lista APENAS no primeiro mount:
  React.useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then(res => res.json())
      .then(json => setList(json.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ─── Card do último Pokémon visto ─── */}
      {last && (
        <TouchableOpacity
          style={styles.last}
          onPress={() => navigation.navigate('Details', { id: last.id })}
        >
          <Text style={styles.lastText}>
            🎯 Último visto: #{last.id}{' '}
            {last.name[0].toUpperCase() + last.name.slice(1)}
          </Text>
        </TouchableOpacity>
      )}

      {/* ─── Lista de Pokémons ─── */}
      <FlatList
        data={list}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => {
          const id = index + 1;
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Details', { id })}
            >
              <Text style={styles.text}>
                {`${id}. ${item.name[0].toUpperCase() + item.name.slice(1)}`}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  last: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4
  },
  lastText: { fontWeight: 'bold', fontSize: 16 },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  text: { fontSize: 16 }
});
