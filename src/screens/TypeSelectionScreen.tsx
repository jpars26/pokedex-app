// src/screens/TypeSelectionScreen.tsx
import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { usePokemonTypes } from '../hooks/usePokemonTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'TypeSelection'>;

// 1️⃣ Mapeie cada tipo para o seu arquivo de imagem:
const typeIcons: Record<string, any> = {
  bug:      require('../../assets/elements/bug.png'),
  dark:     require('../../assets/elements/dark.png'),
  dragon:   require('../../assets/elements/dragon.png'),
  electric: require('../../assets/elements/electric.png'),
  fairy:    require('../../assets/elements/fairy.png'),
  fighting: require('../../assets/elements/fighting.png'),
  fire:     require('../../assets/elements/fire.png'),
  flying:   require('../../assets/elements/flying.png'),
  ghost:    require('../../assets/elements/ghost.png'),
  grass:    require('../../assets/elements/grass.png'),
  ground:   require('../../assets/elements/ground.png'),
  ice:      require('../../assets/elements/ice.png'),
  normal:   require('../../assets/elements/normal.png'),
  poison:   require('../../assets/elements/poison.png'),
  psychic:  require('../../assets/elements/psychic.png'),
  rock:     require('../../assets/elements/rock.png'),
  steel:    require('../../assets/elements/steel.png'),
  water:    require('../../assets/elements/water.png'),
};

export function TypeSelectionScreen({ navigation }: Props) {
  const { types, loading, error } = usePokemonTypes();

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error)   return <ActivityIndicator style={styles.center} size="large" color="red" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha o tipo do Pokémon
      </Text>
      <FlatList
        data={types}
        keyExtractor={item => item.name}
        numColumns={4}
        renderItem={({ item }) => {
          const icon = typeIcons[item.name];           // pega a imagem certa
          return (
            <TouchableOpacity
              style={styles.typeButton}
              onPress={() => navigation.navigate('TypeList', { type: item.name })}
            >
              <Image source={icon} style={styles.icon} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, padding: 16, marginTop: 50 },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title:       { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  typeButton:  {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon:        {
    width: 50,      // ajuste ao tamanho que preferir
    height: 50,
    resizeMode: 'contain',
  },
});
