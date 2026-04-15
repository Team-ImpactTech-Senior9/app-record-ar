import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, TYPOGRAPHY, BORDERS, TOUCH, SHADOWS } from '../styles/colors';

export default function Tutoriales() {
  const [juegoActivo, setJuegoActivo] = useState(null); // 'memoria', 'calculadora', 'quienEs'
  const [puntaje, setPuntaje] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState(null);
  
  // Datos para el juego de memoria (reconocimiento de familiares)
  const [familiares, setFamiliares] = useState([
    { id: 1, nombre: 'Marta', emoji: '👩', parentesco: 'Hija' },
    { id: 2, nombre: 'Juan', emoji: '👨', parentesco: 'Hijo' },
    { id: 3, nombre: 'Ana', emoji: '👵', parentesco: 'Hermana' },
    { id: 4, nombre: 'Carlos', emoji: '👴', parentesco: 'Hermano' },
  ]);

  // Juego de calculadora simple
  const [operacion, setOperacion] = useState({ num1: 0, num2: 0, operador: '+', resultado: 0 });
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    if (juegoActivo === 'calculadora') {
      generarOperacion();
    }
  }, [juegoActivo]);

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
    
    // Generar opciones (una correcta, tres incorrectas)
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
              setPreguntaActual(0);
            }
          }
        }
      ]);
    } else {
      Alert.alert('Incorrecto', 'Sigue practicando');
    }
  };

  const renderJuegoMemoria = () => (
    <View style={styles.juegoContainer}>
      <Text style={styles.juegoTitulo}>👪 ¿Quién es?</Text>
      <Text style={styles.juegoDescripcion}>Identifica al familiar</Text>
      
      <View style={styles.familiarContainer}>
        <Text style={styles.familiarEmoji}>{familiares[preguntaActual].emoji}</Text>
        <Text style={styles.preguntaTexto}>¿Quién es?</Text>
      </View>
      
      <View style={styles.opcionesContainer}>
        {familiares.map((familiar) => (
          <TouchableOpacity
            key={familiar.id}
            style={styles.opcionBoton}
            onPress={() => verificarFamiliar(familiar)}
          >
            <Text style={styles.opcionTexto}>{familiar.nombre}</Text>
            <Text style={styles.opcionParentesco}>{familiar.parentesco}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.puntaje}>Puntaje: {puntaje}</Text>
    </View>
  );

  const renderJuegoCalculadora = () => (
    <View style={styles.juegoContainer}>
      <Text style={styles.juegoTitulo}>🧮 Ejercicio Mental</Text>
      <Text style={styles.juegoDescripcion}>Resuelve la operación</Text>
      
      <View style={styles.operacionContainer}>
        <Text style={styles.operacionTexto}>
          {operacion.num1} {operacion.operador} {operacion.num2} = ?
        </Text>
      </View>
      
      <View style={styles.opcionesContainer}>
        {opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.opcionBoton}
            onPress={() => verificarRespuesta(opcion)}
          >
            <Text style={styles.opcionNumero}>{opcion}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.puntaje}>Puntaje: {puntaje}</Text>
    </View>
  );

  const renderMenuPrincipal = () => (
    <>
      <Text style={styles.titulo}>🎮 Ejercita tu Mente</Text>
      <Text style={styles.subtitulo}>
        Juegos diseñados para mantener activa tu memoria y agilidad mental
      </Text>
      
      <View style={styles.juegosGrid}>
        <TouchableOpacity
          style={[styles.juegoCard, { backgroundColor: COLORS.primary }]}
          onPress={() => {
            setJuegoActivo('quienEs');
            setPuntaje(0);
            setPreguntaActual(0);
          }}
        >
          <Text style={styles.juegoCardEmoji}>👪</Text>
          <Text style={styles.juegoCardTitulo}>¿Quién es?</Text>
          <Text style={styles.juegoCardDescripcion}>Reconoce a tus familiares</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.juegoCard, { backgroundColor: COLORS.secondary }]}
          onPress={() => {
            setJuegoActivo('calculadora');
            setPuntaje(0);
          }}
        >
          <Text style={styles.juegoCardEmoji}>🧮</Text>
          <Text style={styles.juegoCardTitulo}>Matemática</Text>
          <Text style={styles.juegoCardDescripcion}>Sumas y restas simples</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.consejosContainer}>
        <Text style={styles.consejosTitulo}>💡 Consejos para la memoria</Text>
        <Text style={styles.consejosTexto}>
          • Realiza estos ejercicios diariamente{'\n'}
          • Tómate tu tiempo, no hay apuro{'\n'}
          • Repite los juegos para mejorar tu puntaje
        </Text>
      </View>
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {juegoActivo === null ? (
        renderMenuPrincipal()
      ) : juegoActivo === 'quienEs' ? (
        renderJuegoMemoria()
      ) : juegoActivo === 'calculadora' ? (
        renderJuegoCalculadora()
      ) : null}
      
      {juegoActivo !== null && (
        <TouchableOpacity
          style={styles.botonSalir}
          onPress={() => {
            Alert.alert('Salir del juego', '¿Quieres volver al menú principal?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Salir', onPress: () => setJuegoActivo(null) }
            ]);
          }}
        >
          <Text style={styles.textoSalir}>← Volver al menú</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: COLORS.surface,
  },
  titulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  subtitulo: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  juegosGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  juegoCard: {
    flex: 1,
    marginHorizontal: 8,
    padding: 20,
    borderRadius: BORDERS.xl,
    alignItems: 'center',
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  juegoCardEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  juegoCardTitulo: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.onPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
    marginBottom: 4,
  },
  juegoCardDescripcion: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onPrimary,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  },
  consejosContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDERS.xl,
    padding: 16,
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
  },
  consejosTitulo: {
    fontSize: TYPOGRAPHY.sizes.headline,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  consejosTexto: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.onSurface,
    lineHeight: 24,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  juegoContainer: {
    flex: 1,
  },
  juegoTitulo: {
    fontSize: TYPOGRAPHY.sizes.display,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
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
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
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
    shadowColor: '#191c21',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 2,
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
  botonSalir: {
    marginTop: 30,
    alignItems: 'center',
    padding: 16,
    minHeight: TOUCH.minHeight,
  },
  textoSalir: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});