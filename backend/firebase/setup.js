const initializeApp = require("firebase/app").initializeApp;
const getAuth = require("firebase/auth").getAuth;  
const firebaseConfig = {
  apiKey: "AIzaSyAWPev1OWtw6kET8rEg9KgmW92-EBz5Ags",
  authDomain: "pehlastake01.firebaseapp.com",
  projectId: "pehlastake01",
  storageBucket: "pehlastake01.appspot.com",
  messagingSenderId: "1005555895355",
  appId: "1:1005555895355:web:7ca90dec25533a22b8e01e"
};


const app = initializeApp(firebaseConfig);
 const auth = getAuth()

 module.exports = { app, auth }