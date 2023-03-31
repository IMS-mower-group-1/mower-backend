const awilix = require('awilix')

//Path for the three layers
const PL_ROUTERS_PATH = './presentation/routers/'
const BLL_PATH = './businessLogic/'
const DAL_PATH = './dataAccess/'

const container = awilix.createContainer()


//registering dependencies
container.register({
    //Position dependencies
    positionRouter: awilix.asFunction(require(PL_ROUTERS_PATH+'positionRouter.mjs')),
    positionService: awilix.asFunction(require(BLL_PATH+'positionService.mjs')),
    positionRepository: awilix.asFunction(require(DAL_PATH+'positionRepository.mjs')),

    //image dependencies
    imageRouter: awilix.asFunction(require(PL_ROUTERS_PATH+'imageRouter.mjs')),
    imageService: awilix.asFunction(require(BLL_PATH+'imageService.mjs')),
    imageRepository: awilix.asFunction(require(DAL_PATH+'imageRepository.mjs'))
})

module.exports = container
