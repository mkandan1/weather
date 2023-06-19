// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyNYI0KaM0f_zl-gj3ynF30CeWAqdiCsM",
  authDomain: "weather-app-4f122.firebaseapp.com",
  projectId: "weather-app-4f122",
  storageBucket: "weather-app-4f122.appspot.com",
  messagingSenderId: "747383625345",
  appId: "1:747383625345:web:7c49c8fcc615f72ca2df80",
  measurementId: "G-TLL6PCRDRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);