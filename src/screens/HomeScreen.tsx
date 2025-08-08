// src/screens/HomeScreen.tsx
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { usePokemonList }       from '../hooks/usePokemonList';
import { useLastViewedPokemon } from '../hooks/useLastViewedPokemon';
import { typeIcons } from '../utils/typeIcons';

const TYPES_ORDER = [
  'fire','water','grass','electric','ice','fighting','poison','ground','flying',
  'psychic','bug','rock','ghost','dragon','dark','steel','fairy','normal'
];

const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { list, loading } = usePokemonList(150);
  const { last, refresh } = useLastViewedPokemon();

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const dataWithIds = useMemo(
    () => list.map((p, index) => ({ ...p, id: index + 1 })),
    [list]
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* título + botão buscar */}
      <View style={styles.heroRow}>
        <Text style={styles.title}>Pokédex</Text>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchBtnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* último visto */}
      {last && (
        <TouchableOpacity
          style={styles.lastCard}
          onPress={() => navigation.navigate('Details', { id: last.id })}
        >
          <Image
            source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${last.id}.png` }}
            style={styles.lastImg}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.lastTitle}>Continuar vendo</Text>
            <Text style={styles.lastSubtitle}>
              #{last.id} {last.name[0].toUpperCase() + last.name.slice(1)}
            </Text>
          </View>
          <Text style={styles.lastCta}>Abrir</Text>
        </TouchableOpacity>
      )}

      {/* filtros rápidos por tipo */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typesRow}
      >
        {TYPES_ORDER.map(t => (
          typeIcons[t] ? (
            <TouchableOpacity
              key={t}
              style={styles.typePill}
              onPress={() => navigation.navigate('TypeList', { type: t })}
            >
              <Image source={typeIcons[t]} style={styles.typeIcon} />
              <Text style={styles.typeText}>{t.toUpperCase()}</Text>
            </TouchableOpacity>
          ) : null
        ))}
      </ScrollView>
    </View>
  );

  const renderItem = ({ item }: { item: { id: number; name: string } }) => {
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      >
        <Image source={{ uri: spriteUrl }} style={styles.cardImg} />
        <Text style={styles.cardId}>#{item.id}</Text>
        <Text style={styles.cardName}>
          {item.name[0].toUpperCase() + item.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={dataWithIds}
      keyExtractor={(item) => item.name}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContent}
      renderItem={renderItem}
      // pequenos tunings de performance:
      initialNumToRender={16}
      windowSize={7}
      removeClippedSubviews
    />
  );
};

export default HomeScreen;

const CARD_SIZE = 160;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between' },

  header: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: '#f7f7f7' },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  searchBtn: {
    backgroundColor: '#e91e63',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8
  },
  searchBtnText: { color: '#fff', fontWeight: '700' },

  lastCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4
  },
  lastImg: { width: 64, height: 64, marginRight: 12 },
  lastTitle: { fontSize: 12, color: '#666' },
  lastSubtitle: { fontSize: 16, fontWeight: '700' },
  lastCta: { color: '#e91e63', fontWeight: '700', marginLeft: 8 },

  typesRow: { paddingVertical: 8, gap: 10 },
  typePill: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, marginRight: 8
  },
  typeIcon: { width: 20, height: 20, marginRight: 6 },
  typeText: { fontSize: 12, fontWeight: '700' },

  card: {
    width: CARD_SIZE, height: CARD_SIZE,
    backgroundColor: '#fff', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 3
  },
  cardImg: { width: 80, height: 80, marginBottom: 8 },
  cardId: { fontSize: 12, color: '#888', marginBottom: 4 },
  cardName: { fontSize: 14, fontWeight: '700' },
});
