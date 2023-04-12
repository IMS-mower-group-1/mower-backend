import express from 'express'
import errorHandler from '../utils/errorHandler.mjs';

const expressApp = express()
expressApp.use(express.json());

export default function ({
  positionRouter,
  imageRouter,
  mowSessionRouter
}) {

  expressApp.use((req, res, next) => {
    next()
  })

  // Add authentication token for requests using middleware!!

  expressApp.use("/position", positionRouter)
  expressApp.use("/image", imageRouter)
  expressApp.use("/mow-session", mowSessionRouter)

  // Error handling middleware
  expressApp.use(errorHandler);

  expressApp.get("/", (req, res) => {
    res.send("TIGN13")
  })

  return expressApp
}

