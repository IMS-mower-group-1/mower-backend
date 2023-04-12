import express from "express"

export default function createPositionRouter({positionService}) {

    const router = express.Router();
    // What is the data format for position? 

    // Get current position for 
    router.get("/", (req, res) => {
        console.log(`Someone tried to GET position`);
        const coordinates = positionService.getCoordinates()
        res.json(coordinates)
    })

    // Update position
    router.post("/update/:id", async(req, res) => {
        const mowerId = req.params.id
        const currentPostition = req.body.position 
        try {
            await positionService.updatePosition(mowerId, currentPostition)
            res.status(200).json({ message: "Position updated & added to the mowing session path" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    })

    return router
}
