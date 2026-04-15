import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import BotonGrande from '../components/BotonGrande';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS } from '../styles/colors';

export default function Ayuda() {
  const llamarEmergencia = () => {
    Linking.openURL('tel:911');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>⚙️ Centro de Ayuda</Text>
      <Text style={styles.subtitulo}>Clarity Care - Asistencia y configuración</Text>
      
      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>📞 Contacto de Emergencia</Text>
        <Text style={styles.seccionTexto}>
          Ante cualquier emergencia médica, no dudes en contactar a los servicios de salud.
        </Text>
        <BotonGrande
          titulo="Llamar a Emergencias (911)"
          onPress={llamarEmergencia}
          color={COLORS.error}
          variant="error"
        />
      </View>

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>ℹ️ Acerca de Clarity Care</Text>
        <Text style={styles.seccionTexto}>
          Versión: 1.0.0{'\n'}
          Desarrollado por Team ImpactTech{'\n'}
          App diseñada para adultos mayores con estándares de accesibilidad.
        </Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>🔧 Configuración</Text>
        <Text style={styles.seccionTexto}>
          • Tamaño de texto: Estándar (14px){'\n'}
          • Notificaciones: Activadas{'\n'}
          • Modo offline: Disponible
        </Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>📚 Tutoriales</Text>
        <Text style={styles.seccionTexto}>
          Visita la sección de Tutoriales para ejercitar tu memoria con juegos interactivos.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.surface,
  },
  titulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitulo: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  seccion: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  seccionTitulo: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  seccionTexto: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    lineHeight: 22,
    marginBottom: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});