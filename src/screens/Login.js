import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonGrande from '../components/BotonGrande';

export default function Login({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🔐 Iniciar Sesión</Text>
      <Text style={styles.subtitulo}>Accede con tu cuenta de Google</Text>
      
      <View style={styles.botonContainer}>
        <BotonGrande
          titulo="Iniciar con Google"
          onPress={() => navigation.replace('Home')}
          color="#4285F4"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  botonContainer: {
    width: '100%',
  },
});