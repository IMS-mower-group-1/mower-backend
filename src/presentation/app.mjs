import express from 'express'

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

  expressApp.get("/", (req, res) => {
    res.send("TIGN13")
  })
  
  return expressApp
}

