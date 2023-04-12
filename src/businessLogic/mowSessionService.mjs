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
            end: null
        }
        return await this.mowSessionRepository.startMowSessionByMowerId(mowerId, sessionData);
    }

    async endMowSessionByMowerId(mowerId) {

        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
        
        // Get the active mow-session
        const activeSession = await this.mowSessionRepository.getActiveSession(mowerId);
    
        if (!activeSession) {
            return;
        }
    
        // Update the end field of the active session with currentDate
        await this.mowSessionRepository.endMowSession(mowerId, activeSession.id, formattedCurrentDate);
    }
    //TODO: Add business-logic for mow sessions
}