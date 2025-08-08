// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../navigation';

type SearchProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

// se seu arquivo está em: projectRoot/assets/logo.jpg
const logo = require('../../assets/logo.png');

// chips de atalho (IDs conhecidos)
const QUICK = [
  { id: 25, label: 'Pikachu' },
  { id: 1,  label: 'Bulbasaur' },
  { id: 4,  label: 'Charmander' },
  { id: 7,  label: 'Squirtle' },
];

const SearchScreen: React.FC<SearchProps> = ({ navigation }) => {
  const [term, setTerm] = useState<string>('');

  const handleSearch = () => {
    const clean = term.trim().toLowerCase();
    if (!clean) {
      Alert.alert('Por favor, insira um ID válido.');
      return;
    }
    // esta tela está navegando por ID (número)
    const num = Number(clean);
    if (Number.isNaN(num) || num <= 0) {
      Alert.alert('Use um número válido (ex.: 25 para o Pikachu).');
      return;
    }
    navigation.navigate('Details', { id: num });
    setTerm('');
  };

  const handleQuick = (id: number) => {
    navigation.navigate('Details', { id });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Logo + título */}
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Buscar Pokémon</Text>
          <Text style={styles.subtitle}>Digite o <Text style={{fontWeight:'700'}}>ID</Text> (ex.: 25) ou toque num atalho</Text>

          {/* Input + botão primário */}
          <View style={styles.inputRow}>
            <TextInput
              placeholder="ID do Pokémon"
              value={term}
              onChangeText={setTerm}
              keyboardType="number-pad"
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              style={styles.input}
              testID="search-input"
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSearch} testID="search-button">
              <Text style={styles.primaryBtnText}>Buscar</Text>
            </TouchableOpacity>
          </View>

          {/* Chips de atalho */}
          <View style={styles.chipsRow}>
            {QUICK.map(q => (
              <TouchableOpacity key={q.id} style={styles.chip} onPress={() => handleQuick(q.id)}>
                <Text style={styles.chipText}>#{q.id} {q.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#f7f7f7',
  },
  logo: {
    width: 250,
    height: 120,
    borderRadius: 16,
    marginBottom: 4,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  primaryBtn: {
    backgroundColor: '#e91e63',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 44,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
  chipsRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  chipText: { fontWeight: '700' },
});
