import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonGrande from '../components/BotonGrande';

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🏠 Inicio</Text>
      <Text style={styles.bienvenida}>¡Bienvenido a RecordAR!</Text>
      
      <View style={styles.menu}>
        <BotonGrande
          titulo="📝 Notas"
          onPress={() => navigation.navigate('Notas')}
          color="#4CAF50"
        />
        <BotonGrande
          titulo="📅 Eventos"
          onPress={() => navigation.navigate('Eventos')}
          color="#2196F3"
        />
        <BotonGrande
          titulo="🎮 Tutoriales"
          onPress={() => navigation.navigate('Tutoriales')}
          color="#FF9800"
        />
        <BotonGrande
          titulo="⚙️ Ayuda"
          onPress={() => navigation.navigate('Ayuda')}
          color="#9E9E9E"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  bienvenida: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  menu: {
    gap: 15,
  },
});