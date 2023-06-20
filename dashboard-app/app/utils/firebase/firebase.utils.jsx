// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getStorage } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa_6mdwWrOdLe0XWHqi8mygSBfkOUDwEI",
  authDomain: "dashboard-9ba03.firebaseapp.com",
  projectId: "dashboard-9ba03",
  storageBucket: "dashboard-9ba03.appspot.com",
  messagingSenderId: "820722918291",
  appId: "1:820722918291:web:ffcdf0ef930bd744ab3e66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
