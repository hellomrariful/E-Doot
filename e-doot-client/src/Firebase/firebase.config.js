import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATELu6pjXYq_OcLj9nDHC_wvD8TUo5Ca4",
  authDomain: "e-doot.firebaseapp.com",
  projectId: "e-doot",
  storageBucket: "e-doot.appspot.com",
  messagingSenderId: "832084710155",
  appId: "1:832084710155:web:64bb4af06c729b3214880e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;