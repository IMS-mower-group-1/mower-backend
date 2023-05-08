import express from "express"

export default function createPositionRouter({positionService}) {

    const router = express.Router();
    // What is the data format for position? 

    // Get current position for 
    // #B1.1: The backend shall publish a REST API for reading and writing position data that is sent from the mower.
    router.get("/:mowerID", async (req, res, next) => {
        const mowerID = req.params.mowerID
        try{
            const coordinates = await positionService.getCoordinates(mowerID)
            res.status(200).json(coordinates)
        } catch (error) {
            next(error)
        }
    })

    // Update position
    // #B1.1: The backend shall publish a REST API for reading and writing position data that is sent from the mower.
    router.post("/update/:id", async(req, res, next) => {
        const mowerId = req.params.id
        const currentPosition = req.body.position
        try {
            await positionService.updatePosition(mowerId, currentPosition)
            res.status(200).json({ message: "Position updated & added to the mowing session path" });
        } catch (error) {
            next(error)
        }
    })

    return router
}
