import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS, SHADOWS } from '../styles/colors';

export default function Eventos({ navigation }) {
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
          <Text style={styles.pageTitle}>Eventos</Text>
          <Text style={styles.pageSubtitle}>Gestión de su salud y agenda diaria.</Text>
        </View>

        {/* Botón Agregar Evento */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color={COLORS.onPrimary} />
          <Text style={styles.addButtonText}>Agregar Evento</Text>
        </TouchableOpacity>

        {/* Lista de eventos */}
        <View style={styles.cardList}>
          {eventos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay eventos</Text>
              <Text style={styles.emptySubtext}>Presiona "+ Agregar Evento" para crear uno</Text>
            </View>
          ) : (
            eventos.map((evento) => (
              <View key={evento.id} style={styles.cardListItem}>
                <View style={styles.cardListIcon}>
                  <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
                </View>
                <View style={styles.cardListBody}>
                  <Text style={styles.cardListTitle}>{evento.titulo}</Text>
                  <Text style={styles.cardListDesc}>
                    📅 {evento.fecha} - ⏰ {evento.hora}
                  </Text>
                  {evento.descripcion ? (
                    <Text style={styles.cardListDesc}>{evento.descripcion}</Text>
                  ) : null}
                </View>
                <TouchableOpacity 
                  onPress={() => eliminarEvento(evento.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={22} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal para agregar evento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Nuevo Evento</Text>
            
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
              style={styles.dateButton} 
              onPress={() => setMostrarDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                📅 {fecha.toLocaleDateString('es-ES')}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity 
              style={styles.dateButton} 
              onPress={() => setMostrarTimePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                ⏰ {hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>

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
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={agregarEvento}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
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
  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: BORDERS.full,
    gap: 8,
  },
  addButtonText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  // Card List
  cardList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  cardListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    gap: 14,
    ...SHADOWS,
  },
  cardListIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardListBody: {
    flex: 1,
  },
  cardListTitle: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
  },
  cardListDesc: {
    fontSize: 13,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.headline,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    marginHorizontal: 20,
    borderRadius: BORDERS.xl,
    padding: 20,
  },
  modalTitulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: '500',
    color: COLORS.onSurface,
    marginTop: 12,
    marginBottom: 4,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 14,
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.onSurface,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 14,
    marginBottom: 4,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modalBotones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: BORDERS.full,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.surfaceContainerLow,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  saveButtonText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});