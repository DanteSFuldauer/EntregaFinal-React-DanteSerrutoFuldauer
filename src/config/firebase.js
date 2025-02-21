
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyANgsXMlS7eQPrICTIMpFzxOjCDf96IK4Q",
  authDomain: "clase13react-90fda.firebaseapp.com",
  projectId: "clase13react-90fda",
  storageBucket: "clase13react-90fda.firebasestorage.app",
  messagingSenderId: "1034032559027",
  appId: "1:1034032559027:web:53ab9b7baa2babdf1011c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
