// Tokens de diseño Clarity Care
export const COLORS = {
  // Colores Principales (Brand)
  primary: '#004692',          // Azul Clínico Autoridad
  primaryContainer: '#275fae',
  onPrimary: '#ffffff',
  
  secondary: '#1b6d24',        // Verde Vitalidad/Salud
  secondaryContainer: '#a0f399',
  onSecondaryContainer: '#217128',

  // Superficies (Backgrounds)
  surface: '#f9f9ff',               // Nivel 0: Fondo Escenario
  surfaceContainerLow: '#f2f3fb',   // Nivel 1: Bloques/Contenedores Grandes
  surfaceContainerLowest: '#ffffff', // Nivel 2: Tarjetas destacadas
  onSurface: '#191c21',            // Texto base (NUNCA #000000)
  
  // Contornos y Errores
  outlineVariant: '#c2c6d4',
  error: '#ba1a1a',

  // Estados
  disabled: '#c2c6d4',
  onDisabled: '#ffffff',
};

export const TYPOGRAPHY = {
  fontFamily: 'Lexend', // Se implementará después
  sizes: {
    body: 14,      // mínimo para texto funcional
    title: 18,
    headline: 24,
    display: 32,
  },
};

export const BORDERS = {
  full: 9999,  // Pill-shaped para botones/inputs
  xl: 48,      // 3rem para tarjetas grandes
};

export const TOUCH = {
  minHeight: 56, // Área de toque mínima para seniors
};

export const SHADOWS = {
  soft: '0px 4px 32px rgba(25, 28, 33, 0.06)', // Glow ambiental
};