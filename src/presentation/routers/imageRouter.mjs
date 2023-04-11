import express from "express";
import bodyParser from "body-parser";

export default function createImageRouter({ imageService }) {
    const router = express.Router();
    router.use(
        bodyParser.raw({ type: "application/octet-stream", limit: "10mb" })
    );

    // Get image data
    router.get("/:id", (req, res) => {});

    // Upload image
    // Find out how IMAGE can be sent from Mower to API?
    router.post("/upload/:mowerID", async (req, res) => {
        const uint8Array = new Uint8Array(req.body);
        const mowerID = req.params.mowerID;

        try {
            const imageFilename = await imageService.uploadImageToStorage(mowerID, uint8Array);
            const imageAnnotations = await imageService.classifyImage(uint8Array);
            console.log(`GOT IMAGE - containing : ${imageAnnotations[0].name}`);
            // Upload object to Firestore : 
            /*
              {
                id : 1,
                position : Coordinate,
                imageLink : imageFilename,
                avoidedObjectName: imageAnnotations[0].name
              }
            */  
            res.sendStatus(200);
        } catch (e) {
            console.error("ERROR - Collision avoidance image could not be uploaded...")
            res.sendStatus(500);
        }
    });

    return router;
}
