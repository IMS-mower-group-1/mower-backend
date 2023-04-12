import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";
import serviceAccount from "../config/tign13-backend-firebase-adminsdk-8n3ni-bd9b0e6ed9.json" assert { type: "json" };

// Initialize Firebase
const firebaseApp = initializeApp({
    projectId: "tign13-backend",
    authDomain: "tign13-backend.firebaseapp.com",
    storageBucket: "tign13-backend.appspot.com",
    messagingSenderId: "848305417166",
    appId: "1:848305417166:web:7d1a5e2431357052f5199f",
    measurementId: "G-0LWNEWQTCE",
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore(firebaseApp);

export default db;
