const express = require("express")
const router = express.Router();

// What is the data format for position? 

// Get current position for 
router.get("/", (req, res) => {
    console.log(`Someone tried to GET position`);
    const coordinates = {
        x: 100,
        y: 204
    }
    res.json(coordinates)
})

// Update position
router.post("/update", (req, res) => {
    // 1. Store previous position in MowSession.path
    // 2. Replace Mower.position with new position.
})

module.exports = router;