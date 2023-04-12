import express from "express"

export default function createPositionRouter({positionService}) {

    const router = express.Router();
    // What is the data format for position? 

    // Get current position for 
    router.get("/:mowerID", async (req, res) => {
        const mowerID = req.params.mowerID
        console.log(`Someone tried to GET position mowerID : ${mowerID}`);
        const coordinates = await positionService.getCoordinates(mowerID)
        res.json(coordinates)
    })

    // Update position
    router.post("/update", (req, res) => {
        // 1. Store previous position in MowSession.path
        // 2. Replace Mower.position with new position.
    })

    return router
}
