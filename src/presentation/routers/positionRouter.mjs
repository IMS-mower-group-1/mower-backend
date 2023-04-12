import express from "express"
import { ValidationError } from '../../utils/errors.mjs';

export default function createPositionRouter({positionService}) {

    const router = express.Router();
    // What is the data format for position? 

    // Get current position for 
    router.get("/:mowerID", async (req, res, next) => {
        const mowerID = req.params.mowerID
        try{
            const coordinates = await positionService.getCoordinates(mowerID)
            res.json(coordinates)
        } catch (error) {
            next(error)
        }
    })

    // Update position
    router.post("/update/:id", async(req, res, next) => {
        const mowerId = req.params.id
        const currentPostition = req.body.position 
        try {
            await positionService.updatePosition(mowerId, currentPostition)
            res.status(200).json({ message: "Position updated & added to the mowing session path" });
        } catch (error) {
            next(error)
        }
    })

    return router
}
