import express from "express"

export default function createMowSessionRouter({mowSessionService}) {

    const router = express.Router();


    // Get all mow sessions for mower by mower-id
    router.get("/mower/:id", async (req, res) => {
        const mowerId = req.params.id 
        try {
            const sessions = await mowSessionService.getAllSessionsByMowerId(mowerId)
            res.status(200).json(sessions)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    });

    router.post("/start-session/:id", async (req, res) => {
        const mowerId = req.params.id;
        try {
            const sessionId = await mowSessionService.startMowSessionByMowerId(mowerId);
            res.status(201).json({ message: 'Mowing session started successfully', sessionId });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    router.post("/end-session/:id", async (req, res) => {
        const mowerId = req.params.id
        try {
            await mowSessionService.endMowSessionByMowerId(mowerId)
            res.status(200).json({ message: 'Mowing session ended successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' })
        }
    });

    return router
}
