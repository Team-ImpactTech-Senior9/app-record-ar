import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, TOUCH, BORDERS, SHADOWS } from '../styles/colors';

export default function Tutoriales({ navigation }) {
  const [juegoActivo, setJuegoActivo] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [operacion, setOperacion] = useState({ num1: 0, num2: 0, operador: '+', resultado: 0 });
  const [opciones, setOpciones] = useState([]);

  const familiares = [
    { id: 1, nombre: 'Marta', emoji: '👩', parentesco: 'Hija' },
    { id: 2, nombre: 'Juan', emoji: '👨', parentesco: 'Hijo' },
    { id: 3, nombre: 'Ana', emoji: '👵', parentesco: 'Hermana' },
    { id: 4, nombre: 'Carlos', emoji: '👴', parentesco: 'Hermano' },
  ];

  const generarOperacion = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operadores = ['+', '-'];
    const operador = operadores[Math.floor(Math.random() * operadores.length)];
    let resultado;
    
    if (operador === '+') {
      resultado = num1 + num2;
    } else {
      resultado = num1 - num2;
    }
    
    setOperacion({ num1, num2, operador, resultado });
    
    const opcionesGeneradas = [resultado];
    while (opcionesGeneradas.length < 4) {
      const offset = Math.floor(Math.random() * 10) + 1;
      const opcion = operador === '+' ? resultado + offset : resultado - offset;
      if (!opcionesGeneradas.includes(opcion) && opcion > 0) {
        opcionesGeneradas.push(opcion);
      }
    }
    setOpciones(opcionesGeneradas.sort(() => Math.random() - 0.5));
  };

  const iniciarJuego = (tipo) => {
    setPuntaje(0);
    setPreguntaActual(0);
    if (tipo === 'calculadora') {
      generarOperacion();
    }
    setJuegoActivo(tipo);
  };

  const verificarRespuesta = (respuesta) => {
    if (respuesta === operacion.resultado) {
      setPuntaje(puntaje + 10);
      Alert.alert('¡Correcto! 🎉', 'Has acertado', [{ text: 'Continuar', onPress: generarOperacion }]);
    } else {
      Alert.alert('Incorrecto', `La respuesta correcta era ${operacion.resultado}`, [{ text: 'Intentar de nuevo', onPress: generarOperacion }]);
    }
  };

  const verificarFamiliar = (familiarSeleccionado) => {
    if (familiarSeleccionado.nombre === familiares[preguntaActual].nombre) {
      setPuntaje(puntaje + 10);
      Alert.alert('¡Correcto! 🎉', 'Identificaste correctamente', [
        { 
          text: preguntaActual < familiares.length - 1 ? 'Siguiente' : 'Finalizar',
          onPress: () => {
            if (preguntaActual < familiares.length - 1) {
              setPreguntaActual(preguntaActual + 1);
            } else {
              Alert.alert('¡Completaste el juego!', `Puntaje final: ${puntaje + 10} puntos`);
              setJuegoActivo(null);
            }
          }
        }
      ]);
    } else {
      Alert.alert('Incorrecto', 'Sigue practicando');
    }
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

  const guias = [
    {
      id: 'wifi',
      titulo: '¿Cómo conectar el WiFi?',
      descripcion: 'Y encender los datos móviles',
      icon: 'wifi-outline',
      pasos: [
        '1. Abre Configuración',
        '2. Toca "WiFi" o "Conexiones"',
        '3. Activa el interruptor de WiFi',
        '4. Selecciona tu red',
        '5. Ingresa la contraseña',
      ],
    },
    {
      id: 'letra',
      titulo: '¿Cómo agrandar la letra?',
      descripcion: 'Ajustar el tamaño en el celular',
      icon: 'text-outline',
      pasos: [
        '1. Abre Configuración',
        '2. Toca "Pantalla" o "Accesibilidad"',
        '3. Selecciona "Tamaño de fuente"',
        '4. Ajusta el tamaño',
      ],
    },
    {
      id: 'whatsapp',
      titulo: 'Estados de WhatsApp',
      descripcion: '¿Cómo subir fotos y videos?',
      icon: 'logo-whatsapp',
      pasos: [
        '1. Abre WhatsApp',
        '2. Toca la pestaña "Estados"',
        '3. Toca el ícono "+"',
        '4. Selecciona foto o video',
        '5. Toca "Enviar"',
      ],
    },
  ];

  const renderGuiaDetalle = (guia) => (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitulo}>{guia.titulo}</Text>
        <View style={styles.pasosContainer}>
          {guia.pasos.map((paso, index) => (
            <Text key={index} style={styles.pasoTexto}>{paso}</Text>
          ))}
        </View>
        <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(null)}>
          <Text style={styles.modalCloseText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const [modalVisible, setModalVisible] = useState(null);
  const [guiaSeleccionada, setGuiaSeleccionada] = useState(null);

  if (juegoActivo === 'memoria') {
    return renderJuegoMemoria();
  }
  
  if (juegoActivo === 'calculadora') {
    return renderJuegoCalculadora();
  }

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
          <Text style={styles.pageTitle}>Guías</Text>
          <Text style={styles.pageSubtitle}>Tutoriales paso a paso para usar el celular.</Text>
        </View>

        {/* Tarjetas de guías */}
        <View style={styles.cardList}>
          {guias.map((guia) => (
            <TouchableOpacity
              key={guia.id}
              style={styles.guiaCard}
              onPress={() => {
                setGuiaSeleccionada(guia);
                setModalVisible(true);
              }}
            >
              <View style={styles.guiaCardBody}>
                <View style={styles.guiaCardIcon}>
                  <Ionicons name={guia.icon} size={24} color={COLORS.primary} />
                </View>
                <View style={styles.guiaCardText}>
                  <Text style={styles.guiaCardTitle}>{guia.titulo}</Text>
                  <Text style={styles.cardListDesc}>{guia.descripcion}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.outlineVariant} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
       
      </ScrollView>

      {/* Modal de guía */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>{guiaSeleccionada?.titulo}</Text>
            <View style={styles.pasosContainer}>
              {guiaSeleccionada?.pasos.map((paso, index) => (
                <Text key={index} style={styles.pasoTexto}>{paso}</Text>
              ))}
            </View>
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
  // Card List
  cardList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  guiaCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    ...SHADOWS,
  },
  guiaCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  guiaCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guiaCardText: {
    flex: 1,
  },
  guiaCardTitle: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 2,
  },
  cardListDesc: {
    fontSize: 13,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  // Juegos Section
  juegosSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 16,
  },
  juegosGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  juegoCard: {
    flex: 1,
    padding: 16,
    borderRadius: BORDERS.xl,
    alignItems: 'center',
    ...SHADOWS,
  },
  juegoCardEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  juegoCardTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
    textAlign: 'center',
  },
  juegoCardDescripcion: {
    fontSize: 12,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    marginHorizontal: 20,
    borderRadius: BORDERS.xl,
    padding: 24,
  },
  modalTitulo: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  pasosContainer: {
    marginBottom: 24,
  },
  pasoTexto: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 12,
    lineHeight: 24,
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
  // Juegos activos
  juegoContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginLeft: 8,
  },
  juegoTitulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  juegoDescripcion: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  familiarContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 30,
    marginBottom: 30,
    ...SHADOWS,
  },
  familiarEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  preguntaTexto: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onSurface,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  operacionContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 40,
    marginBottom: 30,
    ...SHADOWS,
  },
  operacionTexto: {
    fontSize: 48,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  opcionesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  opcionBoton: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.full,
    padding: 16,
    minWidth: 100,
    alignItems: 'center',
    ...SHADOWS,
  },
  opcionTexto: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  opcionParentesco: {
    fontSize: 12,
    color: COLORS.outlineVariant,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  opcionNumeroBoton: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.full,
    padding: 16,
    minWidth: 80,
    alignItems: 'center',
    ...SHADOWS,
  },
  opcionNumero: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.secondary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  puntaje: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});