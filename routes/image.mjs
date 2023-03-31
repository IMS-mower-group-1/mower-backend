import express from "express"
import bodyParser from "body-parser"
import { Blob } from 'fetch-blob'
import { getStorage, ref, uploadBytes } from "firebase/storage"

const router = express.Router();

router.use(bodyParser.raw({ type: "application/octet-stream" }));

// Get image data
router.get("/:id", (req, res) => {});

// Upload image
// Find out how IMAGE can be sent from Mower to API?
router.post("/upload", (req, res) => {
  // 0. Upload to Firebase Storage
  console.log(req.body);
  const dummyUserID = "user1244346";
  const date = "2022-03-30_13:35:24";
  const storage = getStorage();

  const uint8Array = new Uint8Array(req.body);
  const buffer = Buffer.from(uint8Array);
  const blob = new Blob([buffer], { type: "application/octet-stream" });

  const newImageReference = ref(storage, `${dummyUserID}/${date}`);
  uploadBytes(newImageReference, blob)
    .then((snapshot) => {
      console.log(`Uploaded Blob!`);
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(`Could not upload Blob...`);
      res.sendStatus(500);
    });

  uploadBytes(newImageReference, req);

  // 1. Perform Image Classification using Google API
  // 2. Write Data to database.
  // 2.5 Send update to all listeners that wait for data? (Not necessary if we use Firebase Realtime Database, but maybe we want to use Firestore?)
});

export default router;