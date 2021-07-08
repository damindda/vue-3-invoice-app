import firebase from 'firebase/app';
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDqbfWf9fhvW4MX-AUavYWXMAU8ifewJw8",
    authDomain: "invoice-app-9617f.firebaseapp.com",
    projectId: "invoice-app-9617f",
    storageBucket: "invoice-app-9617f.appspot.com",
    messagingSenderId: "769355864426",
    appId: "1:769355864426:web:c71e630d15b2d682806d13"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();