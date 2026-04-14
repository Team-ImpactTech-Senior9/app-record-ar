import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Ayuda() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>⚙️ Pantalla de Ayuda</Text>
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
    color: '#9E9E9E',
    marginBottom: 10,
  },
  subtexto: {
    fontSize: 18,
    color: '#666',
  },
});