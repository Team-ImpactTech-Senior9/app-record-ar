import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, BORDERS, SHADOWS } from '../styles/colors';

export default function TarjetaEvento({ evento, onEliminar }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.contenido}>
        <Text style={styles.titulo}>{evento.titulo}</Text>
        <Text style={styles.fecha}>
          📅 {evento.fecha} - ⏰ {evento.hora}
        </Text>
        {evento.descripcion ? (
          <Text style={styles.descripcion}>{evento.descripcion}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => onEliminar(evento.id)} style={styles.botonEliminar}>
        <Text style={styles.eliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  contenido: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: 'Lexend',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 14,
    color: COLORS.secondary,
    fontFamily: 'Lexend',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: COLORS.onSurface,
    fontFamily: 'Lexend',
  },
  botonEliminar: {
    padding: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  eliminar: {
    fontSize: 20,
  },
});