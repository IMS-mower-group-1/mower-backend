export default class MowSessionService{
    constructor({mowSessionRepository}){
        this.mowSessionRepository = mowSessionRepository
    }

    async getAllSessionsByMowerId(mowerId){
        // TODO: Validation

        const sessions = await this.mowSessionRepository.getAllSessionsByMowerId(mowerId)

        return sessions

    }
    //TODO: Add business-logic for mow sessions
}