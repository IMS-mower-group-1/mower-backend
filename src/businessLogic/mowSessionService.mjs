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
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const sessionData = {
            path: [],
            start: formattedDate,
            end: ''
        }
        await this.mowSessionRepository.startMowSessionByMowerId(mowerId, sessionData)
    }


    //TODO: Add business-logic for mow sessions
}