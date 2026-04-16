import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS, SHADOWS } from '../styles/colors';

export default function Juegos({ navigation }) {
  const handleSOS = () => {
    Alert.alert(
      'Emergencia SOS',
      '¿Deseas llamar al número de emergencias 911?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Llamar', 
          onPress: () => Linking.openURL('tel:911'),
          style: 'destructive'
        }
      ]
    );
  };

  const handleProfile = () => {
    Alert.alert('Perfil', 'Próximamente');
  };

  return (
    <View style={styles.container}>
      {/* Header con botón SOS y perfil */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <MaterialCommunityIcons name="shield-check" size={18} color="#FFFFFF" />
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            Impac<Text style={styles.logoHighlight}>Tech</Text>
          </Text>
        </View>
        
        <TouchableOpacity style={styles.profileButton} onPress={handleProfile}>
          <Ionicons name="person-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header de la pantalla */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Juegos</Text>
          <Text style={styles.pageSubtitle}>Ejercita tu mente de forma divertida.</Text>
        </View>

        {/* Contenido de próximamente */}
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎮</Text>
          </View>
          
          <Text style={styles.title}>¡Próximamente!</Text>
          
          <Text style={styles.description}>
            Estamos trabajando para traerte juegos divertidos y ejercicios para mantener tu mente activa.
          </Text>
          
          <Text style={styles.description}>
            Muy pronto podrás disfrutar de:
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Juegos de memoria</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Ejercicios de cálculo</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Reconocimiento de familiares</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Y mucho más...</Text>
            </View>
          </View>
          
          <View style={styles.notificationContainer}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
            <Text style={styles.notificationText}>
              Te avisaremos cuando estén listos
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant + '20',
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: BORDERS.full,
    gap: 6,
    minHeight: 40,
  },
  sosText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  logoHighlight: {
    color: COLORS.primaryContainer,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
  },
  // Page Header
  pageHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  // Content
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresList: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.xl,
    padding: 20,
    marginVertical: 20,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 18,
    color: COLORS.primary,
    marginRight: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 12,
    marginTop: 20,
    gap: 10,
  },
  notificationText: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    flex: 1,
  },
});