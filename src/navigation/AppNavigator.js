import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Notas from '../screens/Notas';
import Eventos from '../screens/Eventos';
import Tutoriales from '../screens/Tutoriales';
import Ayuda from '../screens/Ayuda';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Notas" component={Notas} options={{ title: '📝 Notas' }} />
        <Stack.Screen name="Eventos" component={Eventos} options={{ title: '📅 Eventos' }} />
        <Stack.Screen name="Tutoriales" component={Tutoriales} options={{ title: '🎮 Tutoriales' }} />
        <Stack.Screen name="Ayuda" component={Ayuda} options={{ title: '⚙️ Ayuda' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}