export default class PositionService{
    constructor({positionRepository, mowSessionService}){
        this.positionRepository = positionRepository
        this.mowSessionService = mowSessionService
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
        // Updates Mowing session path
        await this.mowSessionService.updateMowSessionPath(mowerId, position)

        // TODO: Update mower position
    }
}