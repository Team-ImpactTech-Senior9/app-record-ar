import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarjetaNota from '../components/TarjetaNota';
import BotonGrande from '../components/BotonGrande';
import { COLORS, BORDERS, TYPOGRAPHY, TOUCH } from '../styles/colors';

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState('');

  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      const notasGuardadas = await AsyncStorage.getItem('@notas');
      if (notasGuardadas) {
        setNotas(JSON.parse(notasGuardadas));
      }
    } catch (error) {
      console.error('Error cargando notas:', error);
    }
  };

  const guardarNotas = async (nuevasNotas) => {
    try {
      await AsyncStorage.setItem('@notas', JSON.stringify(nuevasNotas));
      setNotas(nuevasNotas);
    } catch (error) {
      console.error('Error guardando notas:', error);
    }
  };

  const agregarNota = () => {
    if (!textoNota.trim()) {
      Alert.alert('Atención', 'Escribe algo en la nota');
      return;
    }

    const nuevaNota = {
      id: Date.now().toString(),
      texto: textoNota,
      fecha: new Date().toLocaleDateString('es-ES'),
    };

    const nuevasNotas = [nuevaNota, ...notas];
    guardarNotas(nuevasNotas);
    setTextoNota('');
  };

  const eliminarNota = (id) => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás segura de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const nuevasNotas = notas.filter(nota => nota.id !== id);
            guardarNotas(nuevasNotas);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nota aquí..."
          placeholderTextColor={COLORS.outlineVariant}
          value={textoNota}
          onChangeText={setTextoNota}
          multiline
        />
        <BotonGrande
          titulo="Guardar Nota"
          onPress={agregarNota}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.tituloLista}>Mis Notas</Text>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaNota nota={item} onEliminar={eliminarNota} />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVacia}>
            No hay notas. ¡Agrega tu primera nota!
          </Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  inputContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderBottomWidth: 0, // No usar bordes sólidos
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full, // Pill-shaped
    padding: 16,
    fontSize: TYPOGRAPHY.sizes.body,
    fontFamily: TYPOGRAPHY.fontFamily,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
    color: COLORS.onSurface,
  },
  tituloLista: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    margin: 16,
    marginBottom: 8,
  },
  listaVacia: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 50,
  },
});