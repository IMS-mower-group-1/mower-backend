import express from "express"

export default function createMowSessionRouter({mowSessionService}) {

    const router = express.Router();


    // Get all mow sessions for mower by mower-id
    router.get("/mower/:id", async (req, res) => {
        const mowerId = req.params.id 
        const sessions = await mowSessionService.getAllSessionsByMowerId(mowerId)
        res.json(sessions)
    })
    // TODO: add endpoints for mowing sessions

    return router
}
