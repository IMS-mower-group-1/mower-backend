import express from "express";
import bodyParser from "body-parser";

export default function createImageRouter({ imageService, positionService, mowSessionService }) {
    const router = express.Router();
    router.use(
        bodyParser.raw({ type: "application/octet-stream", limit: "10mb" })
    );

    // Upload image
    // #B1.2 The REST API shall contain a service for reading and writing image data.
    router.post("/upload/:mowerID", async (req, res, next) => {
        const uint8Array = new Uint8Array(req.body);
        const mowerID = req.params.mowerID;
        console.log(`POST Upload route!`);

        try {
            const currentMowerPosition = await positionService.getCoordinates(mowerID);
            const imageFilename = await imageService.uploadImageToStorage(mowerID, uint8Array);
            // #B1.3 When image data is written, the service shall perform an image classification via for example Google API.
            const imageAnnotations = await imageService.classifyImage(uint8Array);
            const mowSessionID = await mowSessionService.getActiveMowSessionByMowerId(mowerID)

            const avoidedCollisionData = {
                accuracy: imageAnnotations[0].score,
                avoidedObject: imageAnnotations[0].name,
                imageLink : imageFilename,
                position: currentMowerPosition
            }

            await imageService.uploadAvoidedCollisionData(mowerID, mowSessionID.id, avoidedCollisionData)

            res.sendStatus(200);
        } catch (error) {
            next(error)
        }
    });

    // Get image url
    // #B1.2 The REST API shall contain a service for reading and writing image data.
    router.get("/getImageURL/:mowerID/:imageName", async (req, res, next) => {
        try {
            const imagePath = `${req.params.mowerID}/${req.params.imageName}`
            const imageURL = await imageService.getCollisionImageDownloadURL(imagePath)
            res.status(200).json({
                imageURL : imageURL 
            });
        } catch (error) {
            next(error)
        }

    });

    return router;
}
