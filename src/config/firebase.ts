import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAoWn35_BCNY1pYcP6xni_SscrmoG5jQik",
  authDomain: "fudibot-d078c.firebaseapp.com",
  projectId: "fudibot-d078c",
  storageBucket: "fudibot-d078c.appspot.com",
  messagingSenderId: "720863024000",
  appId: "1:720863024000:web:8b6e7ce31a645f4e4a2765",
  measurementId: "G-1WFS8NGNVQ"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;