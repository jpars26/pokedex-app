// src/navigation/index.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator }    from '@react-navigation/native-stack';
import { createBottomTabNavigator }      from '@react-navigation/bottom-tabs';
import Ionicons                           from '@expo/vector-icons/Ionicons';

import HomeScreen             from '../screens/HomeScreen';
import SearchScreen           from '../screens/SearchScreen';
import DetailsScreen          from '../screens/DetailsScreen';
import { TypeSelectionScreen } from '../screens/TypeSelectionScreen';
import { TypeListScreen }      from '../screens/TypeListScreen';

// ----------------------
// rotas do stack principal
export type RootStackParamList = {
  Tabs:             undefined;            // bottom tabs
  Details:          { id: number };       // detalhes de um Pokémon
  TypeSelection:    undefined;            // escolher tipo
  TypeList:         { type: string };     // lista filtrada por tipo
};

// rotas do bottom tabs
export type TabParamList = {
  Home:    undefined;
  Search:  undefined;
  Types:   undefined; // tela de seleção de tipos
  Details: { id: number };
};

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab   = createBottomTabNavigator<TabParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName;
          if (route.name === 'Home')   iconName = 'home';
          else if (route.name === 'Search') iconName = 'search';
          else if (route.name === 'Types')  iconName = 'layers';
          else                              iconName = 'ellipse';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"   component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Types"  component={TypeSelectionScreen} /> 
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detalhes do Pokémon',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="TypeSelection"
          component={TypeSelectionScreen}
          options={{ title: 'Escolha um Tipo' }}
        />
        <Stack.Screen
          name="TypeList"
          component={TypeListScreen}
          options={({ route }) => ({
            title: `Pokémons do Tipo ${route.params.type.toUpperCase()}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
