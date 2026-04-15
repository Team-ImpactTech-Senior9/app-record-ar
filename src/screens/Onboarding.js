import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    badge: 'TODO EN UN LUGAR',
    titulo: 'Bienvenido/a a\nImpactTech',
    descripcion: 'Tu salud, tu agenda y tu entretenimiento, más fácil y claro que nunca.',
    emoji: '👥',
    color: COLORS.primary,
    fondo: COLORS.surface,
  },
  {
    id: '2',
    badge: 'APRENDE FÁCIL',
    titulo: 'Paso a paso,\na tu ritmo',
    descripcion: 'Guías simples y tutoriales cortos para aprender a usar tu celular sin miedo.',
    emoji: '📱',
    color: COLORS.secondary,
    fondo: COLORS.surface,
  },
  {
    id: '3',
    badge: 'SIEMPRE SEGURO/A',
    titulo: 'Herramientas\npara cuidarte',
    descripcion: 'Recordatorios de medicación, notas y un botón SOS siempre a mano.',
    emoji: '✅',
    color: COLORS.primary,
    fondo: COLORS.surface,
  },
];

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: item.fondo }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      
      {/* Emoji/Ícono */}
      <View style={styles.iconoContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      
      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: item.color + '20' }]}>
        <Text style={[styles.badgeTexto, { color: item.color }]}>{item.badge}</Text>
      </View>
      
      {/* Título */}
      <Text style={[styles.titulo, { color: item.color }]}>{item.titulo}</Text>
      
      {/* Descripción */}
      <Text style={styles.descripcion}>{item.descripcion}</Text>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
      />
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.botonSaltar}>
          <Text style={styles.textoSaltar}>Saltar</Text>
        </TouchableOpacity>
        
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.dotActivo,
                { backgroundColor: currentIndex === index ? COLORS.primary : COLORS.outlineVariant }
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity onPress={handleNext} style={styles.botonSiguiente}>
          <Text style={styles.textoSiguiente}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  slide: {
    width,
    height: height - 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  iconoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 40,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BORDERS.full,
    marginBottom: 24,
  },
  badgeTexto: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
    letterSpacing: 1,
  },
  titulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 42,
  },
  descripcion: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 30,
    height: 80,
  },
  botonSaltar: {
    minHeight: TOUCH.minHeight,
    justifyContent: 'center',
  },
  textoSaltar: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.outlineVariant,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  dotActivo: {
    width: 24,
  },
  botonSiguiente: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSiguiente: {
    fontSize: 24,
    color: COLORS.onPrimary,
    fontWeight: '600',
  },
});