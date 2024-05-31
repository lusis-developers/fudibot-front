import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAoWn35_BCNY1pYcP6xni_SscrmoG5jQik",
  authDomain: "fudibot-d078c.firebaseapp.com",
  projectId: "fudibot-d078c",
  storageBucket: "fudibot-d078c.appspot.com",
  messagingSenderId: "720863024000",
  appId: "1:720863024000:web:8b6e7ce31a645f4e4a2765",
  measurementId: "G-1WFS8NGNVQ"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Configurar Firebase Analytics
const analytics = getAnalytics(firebaseApp);

// Exportar instancias de los servicios que se utilizarán en toda la aplicación
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export { firebaseApp, analytics };
