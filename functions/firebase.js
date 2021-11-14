import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLCHsD9yQFD-fHA8OCv0-TwvcBNVXezZc",
  authDomain: "news-d9b4e.firebaseapp.com",
  projectId: "news-d9b4e",
  storageBucket: "news-d9b4e.appspot.com",
  messagingSenderId: "636282801690",
  appId: "1:636282801690:web:d3fbee5d4e4ae39942cba3",
  measurementId: "G-X821M85365"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
module.exports = auth