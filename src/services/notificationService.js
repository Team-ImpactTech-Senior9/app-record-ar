import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configurar comportamiento de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Solicitar permisos
export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('eventos', {
      name: 'Recordatorios de Eventos',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('No se pudieron obtener permisos para notificaciones');
    return;
  }
  
  return token;
}

// Programar notificación para un evento
export async function scheduleEventNotification(evento) {
  // Parsear fecha y hora del evento
  const [dia, mes, anio] = evento.fecha.split('/');
  const [hora, minuto] = evento.hora.split(':');
  
  const fechaEvento = new Date(anio, mes - 1, dia, hora, minuto);
  const ahora = new Date();
  
  // Calcular tiempo para la notificación (1 hora antes)
  const tiempoNotificacion = new Date(fechaEvento.getTime() - 60 * 60 * 1000);
  
  // Solo programar si la fecha es futura
  if (tiempoNotificacion > ahora) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Recordatorio',
        body: `${evento.titulo} - ${evento.fecha} a las ${evento.hora}`,
        data: { eventoId: evento.id },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        date: tiempoNotificacion,
        channelId: 'eventos',
      },
    });
    
    console.log(`Notificación programada para: ${evento.titulo} - ID: ${notificationId}`);
    return notificationId;
  }
  
  return null;
}

// Cancelar notificación de un evento
export async function cancelEventNotification(notificationId) {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notificación cancelada: ${notificationId}`);
  }
}

// Cancelar todas las notificaciones
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('Todas las notificaciones canceladas');
}

// Obtener notificaciones programadas
export async function getScheduledNotifications() {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  return notifications;
}