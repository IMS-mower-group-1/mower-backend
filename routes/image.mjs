import express from "express";
import bodyParser from "body-parser";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient({keyFilename: '../config/tgin13-22678df230b0.json'});

const router = express.Router();

router.use(bodyParser.raw({ type: "application/octet-stream" }));

// Get image data
router.get("/:id", (req, res) => {});

// Upload image
// Find out how IMAGE can be sent from Mower to API?
router.post("/upload/:mowerID", async (req, res) => {
  // 0. Upload to Firebase Storage
  const dummyUserID = req.params.mowerID;
  const date = "2022-03-30_13:35:24";
  const storage = getStorage();

  const uint8Array = new Uint8Array(req.body);

  const newImageReference = ref(storage, `${dummyUserID}/${date}.jpg`);
  uploadBytes(newImageReference, uint8Array)
    .then((snapshot) => {
      console.log(`Uploaded Image!`);
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(`Could not upload Image...`);
      res.sendStatus(500);
    });

  // 1. Perform Image Classification using Google API
  // 2. Write Data to database.
  // 2.5 Send update to all listeners that wait for data? (Not necessary if we use Firebase Realtime Database, but maybe we want to use Firestore?)
});

export default router;
