export default class MowSessionService{
    constructor({mowSessionRepository}){
        this.mowSessionRepository = mowSessionRepository
    }

    async getAllMowSessionsByMowerId(mowerId){
        const mowSessions = await this.mowSessionRepository.getAllMowSessionsByMowerId(mowerId)
        return mowSessions
    }

    async getActiveMowSessionByMowerId(mowerId){
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId)
        return activeMowSession
    }

    async startMowSessionByMowerId(mowerId){
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId)
        if (activeMowSession) {
            throw new Error('Cannot start a new mow session when an active session exists.');
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const mowSessionData = {
            path: [],
            start: formattedDate,
            end: null
        }
        return await this.mowSessionRepository.startMowSessionByMowerId(mowerId, mowSessionData);
    }

    async endMowSessionByMowerId(mowerId) {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
        
        // Get the active mow-session
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId);
    
        if (!activeMowSession) {
            throw new Error('Cannot end a mow session when there is no active session.');
        }
    
        // Update the end field of the active session with currentDate
        await this.mowSessionRepository.endMowSession(mowerId, activeMowSession.id, formattedCurrentDate);
    }

    async updateMowSessionPath(mowerId, currentPosition) {
        // Get the active mow-session
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId);
    
        if (!activeMowSession) {
            throw new Error('Cannot update path when there is no active session');
        }
        // Append currentPosition to the path
        const newPath = activeMowSession.path ? [...activeMowSession.path, currentPosition] : [currentPosition];
    
        // Update the mow session path in the repository
        await this.mowSessionRepository.updateMowSessionPath(mowerId, activeMowSession.id, newPath);
    }

    //TODO: Add business-logic for mow sessions
}