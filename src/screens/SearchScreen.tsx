// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../navigation';

type SearchProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SearchScreen: React.FC<SearchProps> = ({ navigation }) => {
  const [term, setTerm] = useState<string>('');

  const handleSearch = () => {
    const clean = term.trim().toLowerCase();
    if (!clean) {
      Alert.alert('Por favor, insira um nome ou ID válido.');
      return;
    }

    const num = Number(clean);
    const idOrName = isNaN(num) ? clean : num;
    navigation.navigate('Details', { id: Number(idOrName) });
    setTerm('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome ou ID do Pokémon"
        value={term}
        onChangeText={setTerm}
        autoCapitalize="none"
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleSearch} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12
  }
});
