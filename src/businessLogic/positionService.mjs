export default class PositionService{
    constructor({positionRepository}){
        this.positionRepository = positionRepository
    }

    getCoordinates(){
        const coordinates = this.positionRepository.getCoordinates()
        return coordinates
    }
    //TODO: Add business-logic
}