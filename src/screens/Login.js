import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS } from '../styles/colors';

export default function Login({ navigation }) {
  const handleGoogleLogin = () => {
    // Por ahora navega al home
    navigation.replace('Home');
  };

  const handleEmailLogin = () => {
    // Por ahora navega al home
    navigation.replace('Home');
  };

  const handleCreateAccount = () => {
    // Por ahora navega al home
    navigation.replace('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Bienvenido a ImpacTech</Text>
        <Text style={styles.subtitulo}>
          Elige una forma rápida para entrar a tu perfil de salud.
        </Text>
      </View>

      <View style={styles.body}>
        {/* Botón Google */}
        <TouchableOpacity
          style={styles.botonGoogle}
          onPress={handleGoogleLogin}
          activeOpacity={0.7}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={24} color="#4285F4" />
          </View>
          <Text style={styles.textoGoogle}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Botón Email */}
        <TouchableOpacity
          style={styles.botonEmail}
          onPress={handleEmailLogin}
          activeOpacity={0.7}
        >
          <View style={styles.emailIconContainer}>
            <Ionicons name="mail-outline" size={22} color={COLORS.primary} />
          </View>
          <Text style={styles.textoEmail}>Continuar con Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.linkRegistro}>
            ¿No tienes cuenta? <Text style={styles.linkRegistroBold}>Crear cuenta nueva</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 40,
  },
  titulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    lineHeight: 22,
  },
  body: {
    gap: 16,
    marginBottom: 32,
  },
  // Botón Google (estilo "outline")
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: BORDERS.full,
    borderWidth: 1.5,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surfaceContainerLowest,
    minHeight: TOUCH.minHeight,
  },
  googleIconContainer: {
    marginRight: 12,
  },
  textoGoogle: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '500',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  // Botón Email (estilo "solid")
  botonEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: BORDERS.full,
    backgroundColor: COLORS.primary,
    minHeight: TOUCH.minHeight,
  },
  emailIconContainer: {
    marginRight: 12,
  },
  textoEmail: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600',
    color: COLORS.onPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkRegistro: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  linkRegistroBold: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});