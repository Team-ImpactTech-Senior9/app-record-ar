// src/components/BotonGrande.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, BORDERS, TOUCH, SHADOWS } from '../styles/colors';

export default function BotonGrande({ 
  titulo, 
  onPress, 
  color = COLORS.primary,
  disabled = false,
  variant = 'primary' // primary, secondary, error
}) {
  let backgroundColor = color;
  let textColor = COLORS.onPrimary;
  
  if (variant === 'secondary') {
    backgroundColor = COLORS.secondary;
  } else if (variant === 'error') {
    backgroundColor = COLORS.error;
  }

  return (
    <TouchableOpacity
      style={[
        styles.boton,
        { backgroundColor: disabled ? COLORS.disabled : backgroundColor },
        disabled && styles.botonDeshabilitado
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.texto, { color: textColor }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: BORDERS.full, // Pill-shaped
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: TOUCH.minHeight,
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  texto: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lexend',
    color: COLORS.onPrimary,
  },
});