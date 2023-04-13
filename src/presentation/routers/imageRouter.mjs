import express from "express";
import bodyParser from "body-parser";

export default function createImageRouter({ imageService, positionService }) {
    const router = express.Router();
    router.use(
        bodyParser.raw({ type: "application/octet-stream", limit: "10mb" })
    );

    // Upload image
    // Find out how IMAGE can be sent from Mower to API?
    router.post("/upload/:mowerID/:mowSessionID", async (req, res, next) => {
        const uint8Array = new Uint8Array(req.body);
        const mowerID = req.params.mowerID;
        const mowSessionID = req.params.mowSessionID;

        try {
            const currentMowerPosition = await positionService.getCoordinates(mowerID);
            const imageFilename = await imageService.uploadImageToStorage(mowerID, uint8Array);
            const imageAnnotations = await imageService.classifyImage(uint8Array);

            const avoidedCollisionData = {
                accuracy: imageAnnotations[0].score,
                avoidedObject: imageAnnotations[0].name,
                imageLink : imageFilename,
                position: currentMowerPosition
            }

            await imageService.uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData)

            res.sendStatus(200);
        } catch (error) {
            next(error)
        }
    });

    // Get image data
    router.get("/", (req, res) => {
        console.log(`Test ran`);
        res.send(200);
    });

    return router;
}
