// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxOs1A1H_Buf6hO7SUB7ozohLTusE2wrM",
  authDomain: "authentication-a8637.firebaseapp.com",
  projectId: "authentication-a8637",
  storageBucket: "authentication-a8637.appspot.com",
  messagingSenderId: "224927462289",
  appId: "1:224927462289:web:9fe473db247d1392dde030"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
