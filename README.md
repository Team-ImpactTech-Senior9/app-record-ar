# RecordAR - App para Adultos Mayores

## 📱 Descripción
App mobile diseñada para ayudar a adultos mayores con tareas cotidianas:
- 📝 Notas simples
- 📅 Eventos con recordatorios
- 🎮 Tutoriales para ejercitar la memoria

## 🚀 Comenzar

### Prerrequisitos
- Node.js v16+
- Expo CLI
- Cuenta en GitHub

### Instalación
1. Clonar el repositorio
2. `npm install`
3. `npx expo start`

## 📚 Estructura del Proyecto
app-ayuda-mayores/
├── App.js                      # Componente principal
├── index.js                    # Punto de entrada (registerRootComponent)
├── app.json                    # Configuración de Expo
├── assets/                     # Imágenes, íconos y recursos estáticos
├── src/
│   ├── components/             # Componentes reutilizables de UI
│   ├── screens/                # Pantallas de la aplicación
│   ├── navigation/             # Configuración de navegación
│   ├── services/               # Servicios externos (API, autenticación)
│   ├── context/                # Estado global (React Context)
│   ├── utils/                  # Funciones auxiliares
│   ├── styles/                 # Estilos compartidos y temas
│   └── constants/              # Constantes (colores, tamaños)
├── .gitignore
├── package.json                # Dependencias y scripts
└── README.md                   # Documentación