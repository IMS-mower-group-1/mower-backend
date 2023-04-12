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
    router.post("/update/:id", async(req, res) => {
        const mowerId = req.params.id
        const currentPosition = req.body.position
        try {
            await positionService.updatePosition(mowerId, currentPosition)
            res.status(200).json({ message: "Position updated & added to the mowing session path" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    })

    return router
}
