// src/screens/TypeSelectionScreen.tsx
import React from 'react';
import {
  View,
  FlatList,
  Pressable,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { typeIcons } from '../utils/typeIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'TypeSelection'>;

export function TypeSelectionScreen({ navigation }: Props) {
  const { types, loading, error } = usePokemonTypes();

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)   return <ActivityIndicator style={styles.center} size="large" color="red" />;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha o tipo do Pokémon</Text>
        <Text style={styles.subtitle}>Toque em um tipo para ver a lista</Text>

        <FlatList
          data={types}
          keyExtractor={(item) => item.name}
          numColumns={4}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.column}
          initialNumToRender={12}
          windowSize={7}
          removeClippedSubviews
          renderItem={({ item }) => {
            const icon = typeIcons[item.name];
            return (
              <Pressable
                style={({ pressed }) => [
                  styles.typeButton,
                  pressed && styles.pressed,
                ]}
                android_ripple={{ color: 'rgba(0,0,0,0.07)' }}
                onPress={() => navigation.navigate('TypeList', { type: item.name })}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar tipo ${item.name}`}
                testID={`type-${item.name}`}
              >
                <Image source={icon} style={styles.icon} />
                <Text style={styles.label}>{item.name.toUpperCase()}</Text>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const CARD_SIZE = 80;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F7' },
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  title: { fontSize: 20, fontWeight: '800', textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4, marginBottom: 12 },

  listContent: { paddingBottom: 16 },
  column: { justifyContent: 'space-between', marginBottom: 12 },

  typeButton: {
    width: CARD_SIZE,
    aspectRatio: 1,              // quadradinho sem quebrar o layout
    borderRadius: 12,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    // leve sombra
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  pressed: {
    opacity: Platform.select({ ios: 0.85, android: 1 }),
  },
  icon: { width: 42, height: 42, resizeMode: 'contain', marginBottom: 6 },
  label: { fontSize: 11, fontWeight: '700', color: '#333' },
});
