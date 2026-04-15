import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import TarjetaEvento from '../components/TarjetaEvento';
import BotonGrande from '../components/BotonGrande';
import { COLORS, BORDERS, TYPOGRAPHY, TOUCH, SHADOWS } from '../styles/colors';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [mostrarTimePicker, setMostrarTimePicker] = useState(false);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const eventosGuardados = await AsyncStorage.getItem('@eventos');
      if (eventosGuardados) {
        setEventos(JSON.parse(eventosGuardados));
      }
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  };

  const guardarEventos = async (nuevosEventos) => {
    try {
      await AsyncStorage.setItem('@eventos', JSON.stringify(nuevosEventos));
      setEventos(nuevosEventos);
    } catch (error) {
      console.error('Error guardando eventos:', error);
    }
  };

  const agregarEvento = () => {
    if (!titulo.trim()) {
      Alert.alert('Atención', 'Escribe un título para el evento');
      return;
    }

    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    const horaFormateada = hora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const nuevoEvento = {
      id: Date.now().toString(),
      titulo: titulo,
      descripcion: descripcion,
      fecha: fechaFormateada,
      hora: horaFormateada,
      fechaCompleta: fecha.getTime(),
    };

    const nuevosEventos = [nuevoEvento, ...eventos].sort((a, b) => b.fechaCompleta - a.fechaCompleta);
    guardarEventos(nuevosEventos);
    
    setTitulo('');
    setDescripcion('');
    setFecha(new Date());
    setHora(new Date());
    setModalVisible(false);
  };

  const eliminarEvento = (id) => {
    Alert.alert(
      'Eliminar evento',
      '¿Estás segura de que quieres eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const nuevosEventos = eventos.filter(evento => evento.id !== id);
            guardarEventos(nuevosEventos);
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <BotonGrande
        titulo="+ Agregar Evento"
        onPress={() => setModalVisible(true)}
        color={COLORS.secondary}
      />

      <Text style={styles.tituloLista}>Mis Eventos</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaEvento evento={item} onEliminar={eliminarEvento} />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVacia}>
            No hay eventos. ¡Agrega tu primer evento!
          </Text>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Nuevo Evento</Text>
            
            <ScrollView>
              <Text style={styles.label}>Título *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Cita médica"
                placeholderTextColor={COLORS.outlineVariant}
                value={titulo}
                onChangeText={setTitulo}
              />

              <Text style={styles.label}>Descripción (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ej: Llevar análisis"
                placeholderTextColor={COLORS.outlineVariant}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
              />

              <Text style={styles.label}>Fecha</Text>
              <TouchableOpacity 
                style={styles.fechaBoton} 
                onPress={() => setMostrarDatePicker(true)}
              >
                <Text style={styles.fechaTexto}>
                  📅 {fecha.toLocaleDateString('es-ES')}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Hora</Text>
              <TouchableOpacity 
                style={styles.fechaBoton} 
                onPress={() => setMostrarTimePicker(true)}
              >
                <Text style={styles.fechaTexto}>
                  ⏰ {hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {mostrarDatePicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setMostrarDatePicker(false);
                  if (selectedDate) setFecha(selectedDate);
                }}
              />
            )}

            {mostrarTimePicker && (
              <DateTimePicker
                value={hora}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedTime) => {
                  setMostrarTimePicker(false);
                  if (selectedTime) setHora(selectedTime);
                }}
              />
            )}

            <View style={styles.modalBotones}>
              <TouchableOpacity 
                style={[styles.botonModal, styles.botonCancelar]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.botonModal, styles.botonGuardar]} 
                onPress={agregarEvento}
              >
                <Text style={styles.textoBotonGuardar}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  tituloLista: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 20,
    marginBottom: 10,
  },
  listaVacia: {
    textAlign: 'center',
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 28, 33, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    margin: 20,
    borderRadius: BORDERS.xl,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 12,
    fontSize: TYPOGRAPHY.sizes.body,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.onSurface,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  fechaBoton: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 12,
    marginBottom: 10,
    minHeight: TOUCH.minHeight,
    justifyContent: 'center',
  },
  fechaTexto: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  botonModal: {
    flex: 1,
    padding: 15,
    borderRadius: BORDERS.full,
    marginHorizontal: 5,
    alignItems: 'center',
    minHeight: TOUCH.minHeight,
    justifyContent: 'center',
  },
  botonCancelar: {
    backgroundColor: COLORS.surfaceContainerLow,
  },
  botonGuardar: {
    backgroundColor: COLORS.secondary,
  },
  textoBotonCancelar: {
    color: COLORS.onSurface,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  textoBotonGuardar: {
    color: COLORS.onPrimary,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
