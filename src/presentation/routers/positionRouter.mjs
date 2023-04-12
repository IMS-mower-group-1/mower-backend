import express from "express"
import { ValidationError, InternalServerError } from '../../utils/errors.mjs';

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
        const currentPostition = req.body.position 
        try {
            await positionService.updatePosition(mowerId, currentPostition)
            res.status(200).json({ message: "Position updated & added to the mowing session path" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

    return router
}
