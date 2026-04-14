import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarjetaNota({ nota, onEliminar }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.contenido}>
        <Text style={styles.texto}>{nota.texto}</Text>
        <Text style={styles.fecha}>{nota.fecha}</Text>
      </View>
      <TouchableOpacity onPress={() => onEliminar(nota.id)} style={styles.botonEliminar}>
        <Text style={styles.eliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contenido: {
    flex: 1,
  },
  texto: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 5,
  },
  fecha: {
    fontSize: 12,
    color: '#999999',
  },
  botonEliminar: {
    padding: 10,
  },
  eliminar: {
    fontSize: 24,
  },
});