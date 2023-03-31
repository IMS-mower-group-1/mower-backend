import { initializeApp } from "firebase/app"
import express from 'express'

import positionRouter from "./presentation/positionRouter.mjs"
import imageRouter from "./presentation/imageRouter.mjs"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyohwqvRUH-Crr-kGxC5I8LJdR6lgPADM",
  authDomain: "tign13-backend.firebaseapp.com",
  projectId: "tign13-backend",
  storageBucket: "tign13-backend.appspot.com",
  messagingSenderId: "848305417166",
  appId: "1:848305417166:web:7d1a5e2431357052f5199f",
  measurementId: "G-0LWNEWQTCE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const expressApp = express()

// Add authentication token for requests using middleware!!

expressApp.use("/position", positionRouter)
expressApp.use("/image", imageRouter)

expressApp.get("/", (req, res) => {
  res.send("TIGN13")
})

const port = process.env.PORT || 3000

console.log(`Attempting to listen on port ${port}!`);

expressApp.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})