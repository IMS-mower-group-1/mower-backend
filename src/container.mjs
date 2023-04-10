import { createContainer, asFunction, asClass, asValue } from 'awilix'

import db from './firebase.mjs'

import positionRouter from './presentation/routers/positionRouter.mjs'
import positionService from './businessLogic/positionService.mjs'
import positionRepository from './dataAccess/positionRepository.mjs'

import mowSessionRouter from './presentation/routers/mowSessionRouter.mjs'
import mowSessionService from './businessLogic/mowSessionService.mjs'
import mowSessionRepository from './dataAccess/mowSessionRepository.mjs'

import imageRouter from './presentation/routers/imageRouter.mjs'
import imageService from './businessLogic/imageService.mjs'
import imageRepository from './dataAccess/imageRepository.mjs'

const container = createContainer()


// registering dependencies
container.register({
    // Position dependencies
    positionRouter: asFunction(positionRouter),
    positionService: asClass(positionService),
    positionRepository: asClass(positionRepository),

    // Image dependencies
    imageRouter: asFunction(imageRouter),
    imageService: asClass(imageService),
    imageRepository: asClass(imageRepository),

    // Mow session dependencies
    mowSessionRouter: asFunction(mowSessionRouter),
    mowSessionService: asClass(mowSessionService),
    mowSessionRepository: asClass(mowSessionRepository),

    db: asValue(db)
})

export default container;
