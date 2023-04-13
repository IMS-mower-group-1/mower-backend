import { ValidationError } from '../utils/errors.mjs';

export default class PositionService{
    constructor({positionRepository, mowerRepository, mowSessionService}){
        this.positionRepository = positionRepository
        this.mowerRepository = mowerRepository
        this.mowSessionService = mowSessionService
    }

    async mowerExists(mowerId){
        const mower = await this.mowerRepository.getMowerById(mowerId)
        return mower == null ? false : true
    }

    async getCoordinates(mowerId) {
        const mowerExists = await this.mowerExists(mowerId)
        if(!mowerExists){
            throw new ValidationError("The mower does not exist")
        } 
        return await this.positionRepository.getCoordinates(mowerId)
    }
  
    async updatePosition(mowerId, position){
        const mowerExists = await this.mowerExists(mowerId)
        if(mowerExists){
            // Updates Mowing session path
            await this.mowSessionService.updateMowSessionPath(mowerId, position)
            //Updates Mower position
            await this.positionRepository.updateCoordinates(mowerId, position)
        } else {
            throw new ValidationError("The mower does not exist")
        }
    }
}