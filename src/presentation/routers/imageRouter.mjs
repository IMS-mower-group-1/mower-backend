import express from "express";
import bodyParser from "body-parser";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { ImageAnnotatorClient } from "@google-cloud/vision";

import { fileURLToPath } from "url";
import path from "path";

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);

// Get the current module's directory path
const __dirname = path.dirname(__filename);

console.log(__dirname);

export default function createImageRouter({imageService}){
  
  const client = new ImageAnnotatorClient({
    keyFilename: __dirname + "/../config/tgin13-22678df230b0.json",
  });

  const router = express.Router();

  router.use(bodyParser.raw({ type: "application/octet-stream", limit: "10mb" }));

  // Get image data
  router.get("/:id", (req, res) => {});

  // Upload image
  // Find out how IMAGE can be sent from Mower to API?
  router.post("/upload/:mowerID", async (req, res) => {
    // 1. Upload to Firebase Storage
    const dummyUserID = req.params.mowerID;
    const date = "2022-03-30_13:35:24";
    const storage = getStorage();

    const uint8Array = new Uint8Array(req.body);

    const newImageReference = ref(storage, `${dummyUserID}/${date}.jpg`);

    try {
      await uploadBytes(newImageReference, uint8Array)
      console.log(`Uploaded Image!`);

      // 2. Perform Image Classification using Google API

      const features = [
        {
          type: "OBJECT_LOCALIZATION",
          maxResults: 1,
        },
      ];

      const request = {
        image: {
          content: Buffer.from(uint8Array).toString("base64"),
        },
        features: features,
      };

      const results = await client.annotateImage(request)
      console.log(results[0].localizedObjectAnnotations);

      // 3. Add item to Firestore, connecting both image and annotations.

      res.sendStatus(200);

    } catch {
      res.sendStatus(500);
    }
  });

  return router

}

