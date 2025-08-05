import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

// define quais telas o Stack principal vai ter
export type RootStackParamList = {
  Tabs: undefined;               // as abas de baixo
  Details: { id: number };       // a tela de detalhes
};

// define quais abas haverá no bottom-tabs
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Details: { id: number }; // para navegar diretamente para detalhes
};

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab   = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator /* … */>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
  <Stack.Screen
    name="Tabs"
    component={Tabs}
    options={{ headerShown: false }}    // só hide no container de Tabs
  />
  <Stack.Screen
    name="Details"
    component={DetailsScreen}
    options={{
      headerShown: true,                // garanta que o header estará visível
      title: 'Detalhes do Pokémon'      // opcional: personaliza o título
    }}
  />
</Stack.Navigator>
    </NavigationContainer>
  );
}
