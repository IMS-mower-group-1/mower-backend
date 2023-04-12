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

    async getCoordinates(mowerID) {
        return new Promise(async (resolve, reject) => {
            try {
                const coordinates = this.positionRepository.getCoordinates(mowerID)
                resolve(coordinates)
            } catch (e) {
                console.error("ERROR Service - Could not fetch coordinates for mower with id : " + mowerID)
                reject(e)
            }
        })
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