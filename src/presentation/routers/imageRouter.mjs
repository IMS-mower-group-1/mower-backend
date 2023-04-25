import express from "express";
import bodyParser from "body-parser";

export default function createImageRouter({ imageService, positionService, mowSessionService }) {
    const router = express.Router();
    router.use(
        bodyParser.raw({ type: "application/octet-stream", limit: "10mb" })
    );

    // Upload image
    // Find out how IMAGE can be sent from Mower to API?
    router.post("/upload/:mowerID", async (req, res) => {
        const uint8Array = new Uint8Array(req.body);
        const mowerID = req.params.mowerID;
        console.log(`POST Upload route!`);

        try {
            const currentMowerPosition = await positionService.getCoordinates(mowerID);
            const imageFilename = await imageService.uploadImageToStorage(mowerID, uint8Array);
            const imageAnnotations = await imageService.classifyImage(uint8Array);
            const mowSessionID = await mowSessionService.getActiveMowSessionByMowerId(mowerID)
            console.log(mowSessionID.id);

            const avoidedCollisionData = {
                accuracy: imageAnnotations[0].score,
                avoidedObject: imageAnnotations[0].name,
                imageLink : imageFilename,
                position: currentMowerPosition
            }

            await imageService.uploadAvoidedCollisionData(mowerID, mowSessionID.id, avoidedCollisionData)

            res.sendStatus(200);
        } catch (error) {
            console.error("Could not upload image...")
        }
    });

    // Get image url
    router.get("/getImageURL/:mowerID/:imageName", async (req, res) => {
        const imagePath = `${req.params.mowerID}/${req.params.imageName}`
        const imageURL = await imageService.getCollisionImageDownloadURL(imagePath)
        res.json({
            imageURL : imageURL 
        }).send(200);
    });

    return router;
}
