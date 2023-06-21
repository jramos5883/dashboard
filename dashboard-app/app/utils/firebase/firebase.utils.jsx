// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
// const app = initializeApp(firebaseConfig);
// Prevents initializing a new Firebase app if one already exists. This can be
// helpful in a situation where this code could run more than once, as trying to
// initialize a new app with an already in-use configuration will throw an error.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default app;
export { db, storage };
