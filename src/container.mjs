import { createContainer, asFunction, asClass } from 'awilix'

import positionRouter from './presentation/routers/positionRouter.mjs'
import positionService from './businessLogic/positionService.mjs'
import positionRepository from './dataAccess/positionRepository.mjs'

import imageRouter from './presentation/routers/imageRouter.mjs'
import imageService from './businessLogic/imageService.mjs'
import imageRepository from './dataAccess/imageRepository.mjs'

const container = createContainer()


//registering dependencies
container.register({
    //Position dependencies
    positionRouter: asFunction(positionRouter),
    positionService: asClass(positionService),
    positionRepository: asClass(positionRepository),

    //image dependencies
    imageRouter: asFunction(imageRouter),
    imageService: asClass(imageService),
    imageRepository: asClass(imageRepository),
})

export default container;
