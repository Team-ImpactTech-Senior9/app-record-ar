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

export default function Home({ navigation }) {
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

  const categorias = [
    {
      id: 'eventos',
      nombre: 'Eventos',
      descripcion: 'Turnos, remedios y más',
      icon: 'calendar-outline',
      iconLib: 'Ionicons',
      screen: 'Eventos',
    },
    {
      id: 'guias',
      nombre: 'Guías',
      descripcion: 'Tutoriales paso a paso',
      icon: 'book-outline',
      iconLib: 'Ionicons',
      screen: 'Tutoriales',
    },
    {
      id: 'notas',
      nombre: 'Notas',
      descripcion: 'Recordatorios y apuntes',
      icon: 'create-outline',
      iconLib: 'Ionicons',
      screen: 'Notas',
    },
    {
      id: 'juegos',
      nombre: 'Juegos',
      descripcion: 'Ejercita la mente',
      icon: 'game-controller-outline',
      iconLib: 'Ionicons',
      screen: 'Tutoriales',
    },
  ];

  const renderIcon = (item) => {
    if (item.iconLib === 'Ionicons') {
      return <Ionicons name={item.icon} size={24} color={COLORS.primary} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Header con botón SOS y perfil */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <View style={styles.sosIconContainer}>
            <MaterialCommunityIcons name="shield-check" size={18} color="#FFFFFF" />
          </View>
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
        {/* Tarjeta de saludo (home-greeting) */}
        <View style={styles.greetingCard}>
          <Text style={styles.greetingLabel}>Bienvenido de vuelta</Text>
          <Text style={styles.welcomeTitle}>amigo 👋</Text>
          <Text style={styles.greetingDesc}>
            Aquí encontrarás todo lo que necesitás en un solo lugar.
          </Text>
        </View>

        {/* Título sección */}
        <Text style={styles.sectionTitle}>¿Qué querés hacer hoy?</Text>

        {/* Grid de categorías */}
        <View style={styles.gridContainer}>
          {categorias.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryIconContainer}>
                {renderIcon(item)}
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName}>{item.nombre}</Text>
                <Text style={styles.categoryDesc}>{item.descripcion}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.outlineVariant} />
            </TouchableOpacity>
          ))}
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
  // Tarjeta de saludo (similar al prototipo)
  greetingCard: {
    backgroundColor: COLORS.primary + '10',  // Azul muy claro
    borderRadius: BORDERS.xl,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  greetingLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
    fontWeight: '500',
  },
  welcomeTitle: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 8,
  },
  greetingDesc: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 22,
  },
  // Section
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  // Grid
  gridContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    gap: 14,
    ...SHADOWS,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  categoryDesc: {
    fontSize: 13,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});