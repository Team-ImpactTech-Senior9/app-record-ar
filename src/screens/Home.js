import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonGrande from '../components/BotonGrande';
import { COLORS, TYPOGRAPHY } from '../styles/colors';

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🏠 Clarity Care</Text>
      <Text style={styles.bienvenida}>¡Bienvenido a tu asistente de salud!</Text>
      
      <View style={styles.menu}>
        <BotonGrande
          titulo="📝 Notas"
          onPress={() => navigation.navigate('Notas')}
          color={COLORS.primary}
          variant="primary"
        />
        <BotonGrande
          titulo="📅 Eventos"
          onPress={() => navigation.navigate('Eventos')}
          color={COLORS.secondary}
          variant="secondary"
        />
        <BotonGrande
          titulo="🎮 Tutoriales"
          onPress={() => navigation.navigate('Tutoriales')}
          color={COLORS.primaryContainer}
          variant="primary"
        />
        <BotonGrande
          titulo="⚙️ Ayuda"
          onPress={() => navigation.navigate('Ayuda')}
          color={COLORS.outlineVariant}
          variant="primary"
        />
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
    marginTop: 20,
    marginBottom: 10,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  bienvenida: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  menu: {
    gap: 15,
  },
});