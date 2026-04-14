import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Tutoriales() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>🎮 Pantalla de Tutoriales</Text>
      <Text style={styles.subtexto}>Próximamente...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  texto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
  },
  subtexto: {
    fontSize: 18,
    color: '#666',
  },
});