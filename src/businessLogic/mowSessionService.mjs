export default class MowSessionService{
    constructor({mowSessionRepository}){
        this.mowSessionRepository = mowSessionRepository
    }

    async getAllSessionsByMowerId(mowerId){
        // TODO: Validation

        const sessions = await this.mowSessionRepository.getAllSessionsByMowerId(mowerId)

        return sessions

    }

    async startMowSessionByMowerId(mowerId){
        await this.mowSessionRepository.startMowSessionByMowerId(mowerId)
    }


    //TODO: Add business-logic for mow sessions
}