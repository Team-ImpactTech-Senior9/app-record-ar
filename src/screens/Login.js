import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonGrande from '../components/BotonGrande';
import { COLORS, TYPOGRAPHY, TOUCH } from '../styles/colors';

export default function Login({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🔐 Clarity Care</Text>
      <Text style={styles.subtitulo}>Accede con tu cuenta de Google</Text>
      
      <View style={styles.botonContainer}>
        <BotonGrande
          titulo="Iniciar con Google"
          onPress={() => navigation.replace('Home')}
          color={COLORS.primary}
          variant="primary"
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
    backgroundColor: COLORS.surface,
  },
  titulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 10,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitulo: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  botonContainer: {
    width: '100%',
  },
});