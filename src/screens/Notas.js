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
  Linking,
  ScrollView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS, SHADOWS } from '../styles/colors';

export default function Notas() {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

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

  // Función para truncar texto
  const truncarTexto = (texto, maxLength = 80) => {
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  const verNotaCompleta = (nota) => {
    setNotaSeleccionada(nota);
    setModalVisible(true);
  };

  const renderNota = ({ item }) => {
    const textoTruncado = truncarTexto(item.texto, 80);
    const esLarga = item.texto.length > 80;

    return (
      <View style={styles.cardListItem}>
        <View style={styles.cardListIcon}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.cardListBody}>
          <Text style={styles.cardListTitle}>{textoTruncado}</Text>
          <Text style={styles.cardListDesc}>📅 {item.fecha}</Text>
          {esLarga && (
            <TouchableOpacity onPress={() => verNotaCompleta(item)}>
              <Text style={styles.verMasTexto}>Ver más...</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          onPress={() => eliminarNota(item.id)}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={22} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    );
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header de la pantalla */}
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Notas</Text>
            <Text style={styles.pageSubtitle}>Recordatorios y apuntes importantes.</Text>
          </View>

          {/* Input para nueva nota */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu nota aquí..."
              placeholderTextColor={COLORS.outlineVariant}
              value={textoNota}
              onChangeText={setTextoNota}
              multiline
            />
            <TouchableOpacity style={styles.addButton} onPress={agregarNota}>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.onPrimary} />
              <Text style={styles.addButtonText}>Guardar Nota</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de notas */}
          <View style={styles.cardList}>
            {notas.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay notas</Text>
                <Text style={styles.emptySubtext}>Presiona "+ Guardar Nota" para crear una</Text>
              </View>
            ) : (
              notas.map((nota) => (
                <View key={nota.id} style={styles.cardListItem}>
                  <View style={styles.cardListIcon}>
                    <Ionicons name="create-outline" size={24} color={COLORS.primary} />
                  </View>
                  <View style={styles.cardListBody}>
                    <Text style={styles.cardListTitle}>{truncarTexto(nota.texto, 80)}</Text>
                    <Text style={styles.cardListDesc}>📅 {nota.fecha}</Text>
                    {nota.texto.length > 80 && (
                      <TouchableOpacity onPress={() => verNotaCompleta(nota)}>
                        <Text style={styles.verMasTexto}>Ver más...</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity 
                    onPress={() => eliminarNota(nota.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={22} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal para ver nota completa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Nota completa</Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalTexto}>{notaSeleccionada?.texto}</Text>
              <Text style={styles.modalFecha}>📅 {notaSeleccionada?.fecha}</Text>
            </ScrollView>
            <TouchableOpacity 
              style={styles.modalCloseButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
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
  flexContainer: {
    flex: 1,
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
  // Input Container
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDERS.full,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    fontFamily: TYPOGRAPHY.fontFamily,
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
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
  verMasTexto: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500',
    fontFamily: TYPOGRAPHY.fontFamily,
    marginTop: 4,
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
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalTexto: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    lineHeight: 24,
    marginBottom: 16,
  },
  modalFecha: {
    fontSize: 13,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 16,
  },
  modalCloseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: BORDERS.full,
    alignItems: 'center',
  },
  modalCloseText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});