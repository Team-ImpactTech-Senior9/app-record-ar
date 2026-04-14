// src/screens/Onboarding.js
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
import BotonGrande from '../components/BotonGrande';
import { onboardingData } from '../constants/onboardingData';

const { width, height } = Dimensions.get('window');

export default function Onboarding({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.fondo }]}>
        <StatusBar barStyle="dark-content" backgroundColor={item.fondo} />
        
        {/* Emoji grande */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>

        {/* Título */}
        <Text style={[styles.titulo, { color: item.color }]}>
          {item.titulo}
        </Text>

        {/* Descripción */}
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>

        {/* Indicadores visuales */}
        <View style={styles.indicadoresContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicador,
                currentIndex === index && styles.indicadorActivo,
                { backgroundColor: currentIndex === index ? item.color : '#CCCCCC' }
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      // Si es la última pantalla, ir al login
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
      
      {/* Botones */}
      <View style={styles.botonesContainer}>
        {currentIndex < onboardingData.length - 1 ? (
          <>
            <TouchableOpacity onPress={handleSkip} style={styles.botonSaltar}>
              <Text style={styles.textoSaltar}>Saltar</Text>
            </TouchableOpacity>
            <BotonGrande
              titulo="Siguiente"
              onPress={handleNext}
              color="#4CAF50"
            />
          </>
        ) : (
          <BotonGrande
            titulo="Comenzar"
            onPress={handleNext}
            color="#4CAF50"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emojiContainer: {
    marginBottom: 40,
  },
  emoji: {
    fontSize: 120,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  indicadoresContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  indicadorActivo: {
    width: 20,
  },
  botonesContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  botonSaltar: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  textoSaltar: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '600',
  },
});