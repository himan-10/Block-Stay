import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3SUi-TBqI1DyvWQEzIwvDquuRCT7IIdU",
  authDomain: "blockstay-d16f2.firebaseapp.com",
  projectId: "blockstay-d16f2",
  storageBucket: "blockstay-d16f2.firebasestorage.app",
  messagingSenderId: "584518807692",
  appId: "1:584518807692:web:dcb9d5f55b0f736396cba9",
  measurementId: "G-DDHKLRWF5T"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();