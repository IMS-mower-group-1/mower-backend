const express = require("express");
const router = express.Router();

const { getStorage, ref, uploadBytes } = require("firebase/storage");

// Get image data
router.get("/:id", (req, res) => {});

// Upload image
// Find out how IMAGE can be sent from Mower to API?
router.post("/upload", (req, res) => {
  // 0. Upload to Firebase Storage
  console.log(req.file);
  const dummyUserID = "user1244346";
  const storage = getStorage();

  res.sendStatus(200)

//   const newImageReference = ref(storage, `${dummyUserID}/2022-03-30_13:35:24`);
//   uploadBytes(newImageReference, req.file.buffer)
//     .then((snapshot) => {
//       console.log(`Uploaded an array!`);
//       res.sendStatus(200);
//     })
//     .catch((e) => {
//       res.sendStatus(500);
//     });

  // uploadBytes(newImageReference, req)

  // 1. Perform Image Classification using Google API
  // 2. Write Data to database.
  // 2.5 Send update to all listeners that wait for data? (Not necessary if we use Firebase Realtime Database, but maybe we want to use Firestore?)
});

module.exports = router;
