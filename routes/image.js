const express = require("express")
const router = express.Router();

// Get image data
router.get("/:id", (req, res) => {

})

// Upload image
router.post("/upload", (req, res) => {
    // 1. Perform Image Classification using Google API
    // 2. Write Data to database.
    // 2.5 Send update to all listeners that wait for data? (Not necessary if we use Firebase Realtime Database, but maybe we want to use Firestore?)
})

module.exports = router;