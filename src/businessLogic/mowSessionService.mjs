export default class MowSessionService{
    constructor({mowSessionRepository}){
        this.mowSessionRepository = mowSessionRepository
    }

    async getAllSessionsByMowerId(mowerId){
        const mowSessions = await this.mowSessionRepository.getAllSessionsByMowerId(mowerId)
        return mowSessions

    }

    async getActiveSessionByMowerId(mowerId){
        const activeMowSession = await this.mowSessionRepository.getActiveSession(mowerId)
        return activeMowSession

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
        const activeMowSession = await this.mowSessionRepository.getActiveSession(mowerId);
    
        if (!activeMowSession) {
            console.log("No active mowing session found.");
            return;
        }
    
        // Update the end field of the active session with currentDate
        await this.mowSessionRepository.endMowSession(mowerId, activeMowSession.id, formattedCurrentDate);
    }

    async updateMowSessionPath(mowerId, currentPosition) {
        // Get the active mow-session
        const activeMowSession = await this.mowSessionRepository.getActiveSession(mowerId);
    
        if (!activeMowSession) {
            console.log("No active mowing session found.");
            return;
        }
        // Append currentPosition to the path
        const newPath = activeMowSession.path ? [...activeMowSession.path, currentPosition] : [currentPosition];
    
        // Update the mow session path in the repository
        await this.mowSessionRepository.updateMowSessionPath(mowerId, activeMowSession.id, newPath);
    }

    //TODO: Add business-logic for mow sessions
}