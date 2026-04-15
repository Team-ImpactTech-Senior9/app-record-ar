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
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,  // Esto oculta el header en TODAS las pantallas
        }}
      >
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notas" component={Notas} />
        <Stack.Screen name="Eventos" component={Eventos} />
        <Stack.Screen name="Tutoriales" component={Tutoriales} />
        <Stack.Screen name="Ayuda" component={Ayuda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}