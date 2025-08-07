// jest.setup.js

// Configuração do ambiente para testes
if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis;
}

if (typeof globalThis.document === 'undefined') {
  globalThis.document = {};
}

if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = {};
}

// Mock do fetch global
global.fetch = jest.fn();

// Mock do React Native
jest.mock('react-native', () => ({
  StyleSheet: {
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style),
  },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  FlatList: 'FlatList',
  Image: 'Image',
  ScrollView: 'ScrollView',
  SafeAreaView: 'SafeAreaView',
  StatusBar: {
    setBarStyle: jest.fn(),
  },
}));

// Mock do @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock do @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Mock do @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));

// Mock do @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: 'Navigator',
    Screen: 'Screen',
  }),
}));