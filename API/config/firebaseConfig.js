// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_7sgpW3yRoUxrEWwKHfzshITCEw15yxg",
  authDomain: "aceinrerviews.firebaseapp.com",
  projectId: "aceinrerviews",
  storageBucket: "aceinrerviews.appspot.com",
  messagingSenderId: "967216269214",
  appId: "1:967216269214:web:ff760c98fea14dd29b388f",
  measurementId: "G-960K02Y6VV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };

// import serviceAccount from '../'; // Đường dẫn đến tệp service account key JSON

