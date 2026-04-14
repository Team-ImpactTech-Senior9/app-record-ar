import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TarjetaNota from '../components/TarjetaNota';
import BotonGrande from '../components/BotonGrande';

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState('');
  const [editando, setEditando] = useState(false);
  const [notaEditando, setNotaEditando] = useState(null);

  // Cargar notas al iniciar
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
          placeholderTextColor="#999"
          value={textoNota}
          onChangeText={setTextoNota}
          multiline
        />
        <BotonGrande
          titulo="Guardar Nota"
          onPress={agregarNota}
          color="#4CAF50"
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
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 16,
    marginBottom: 8,
  },
  listaVacia: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 50,
  },
});;