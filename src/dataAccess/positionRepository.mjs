export default class PositionRepository{
    constructor({ db }){
        this.db = db;
    }

    //TODO: Add data-access functions
    getCoordinates(){
        const coordinates = {
            x: 159,
            y: 224
        }
        return coordinates
    }
}