export default class PositionService{
    constructor({positionRepository}){
        this.positionRepository = positionRepository
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
    //TODO: Add business-logic
}