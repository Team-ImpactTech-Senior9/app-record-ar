// src/components/BotonGrande.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonGrande({ 
  titulo, 
  onPress, 
  color = '#4CAF50',
  disabled = false 
}) {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        { backgroundColor: color },
        disabled && styles.botonDeshabilitado
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    minWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});