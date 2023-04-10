export default class MowSessionService{
    constructor({mowSessionRepository}){
        this.mowSessionRepository = mowSessionRepository
    }

    getAllSessionsByMowerId(mowerId){
        // TODO: Validation

        const sessions = this.mowSessionRepository.getAllSessionsByMowerId(mowerId)

        return sessions

    }
    //TODO: Add business-logic for mow sessions
}