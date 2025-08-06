// src/screens/HomeScreen.tsx
import React, { useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { usePokemonList }       from '../hooks/usePokemonList';
import { useLastViewedPokemon } from '../hooks/useLastViewedPokemon';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { list, loading } = usePokemonList(150);
  const { last, refresh } = useLastViewedPokemon();

  // Recarrega o “last” sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => { refresh(); }, [refresh])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      keyExtractor={item => item.name}
      // ─── Cabeçalho clicável ───────────────────────────────
      ListHeaderComponent={
        last ? (
          <TouchableOpacity
            style={styles.last}
            onPress={() => navigation.navigate('Details', { id: last.id })}
          >
            <Text style={styles.lastText}>
              🎯 Último visto: #{last.id}{' '}
              {last.name[0].toUpperCase() + last.name.slice(1)}
            </Text>
          </TouchableOpacity>
        ) : null
      }
      // garante padding geral
      contentContainerStyle={styles.contentContainer}
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
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 18,
    marginTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  last: {
    padding: 12,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  lastText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});
