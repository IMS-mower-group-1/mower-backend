import { ValidationError } from '../utils/errors.mjs';
import dateHandler from '../utils/dateHandler.mjs';

export default class MowSessionService{
    constructor({mowSessionRepository, mowerRepository}){
        this.mowSessionRepository = mowSessionRepository
        this.mowerRepository = mowerRepository
    }

    async mowerExists(mowerId){
        const mower = await this.mowerRepository.getMowerById(mowerId)
        return mower == null ? false : true
    }

    async getAllMowSessionsByMowerId(mowerId){
        const mowerExists = await this.mowerExists(mowerId)
        if(mowerExists){
            const mowSessions = await this.mowSessionRepository.getAllMowSessionsByMowerId(mowerId)
            return mowSessions
        } else {
            throw new ValidationError("The mower does not exist")
        }
    }

    async getActiveMowSessionByMowerId(mowerId){
        const mowerExists = await this.mowerExists(mowerId)
        if(mowerExists){
            const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId)
            return activeMowSession
        } else {
            throw new ValidationError("The mower does not exist")
        }
    }

    async startMowSessionByMowerId(mowerId){
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId)
        const mowerExists = await this.mowerExists(mowerId)
        if (!mowerExists) {
            throw new ValidationError('The mower does not exist');
        } else if (activeMowSession){
            throw new ValidationError('Cannot start a new mow session when an active session exists.');
        }

        const firestoreCurrentDate = dateHandler.getCurrentTimeFirestore()
        const mowSessionData = {
            path: [],
            start: firestoreCurrentDate,
            end: null
        }
        return await this.mowSessionRepository.startMowSessionByMowerId(mowerId, mowSessionData);
    }

    async endMowSessionByMowerId(mowerId) {
        const firestoreCurrentDate = dateHandler.getCurrentTimeFirestore()
        
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId);
        const mowerExists = await this.mowerExists(mowerId)
        
        if(!mowerExists){
            throw new ValidationError('The mower does not exist');
        }
        else if (!activeMowSession) {
            throw new ValidationError('Cannot end a mow session when there is no active session.');
        }
        // Update the end field of the active session with currentDate
        await this.mowSessionRepository.endMowSession(mowerId, activeMowSession.id, firestoreCurrentDate);
    }

    async updateMowSessionPath(mowerId, currentPosition) {
        // Get the active mow-session
        const activeMowSession = await this.mowSessionRepository.getActiveMowSession(mowerId);
        const mowerExists = await this.mowerExists(mowerId)
        if(!mowerExists){
            throw new ValidationError('The mower does not exist');
        }
        else if (!activeMowSession) {
            throw new ValidationError('Cannot update path when there is no active session');
        }
        // Append currentPosition to the path
        const newPath = activeMowSession.path ? [...activeMowSession.path, currentPosition] : [currentPosition];
    
        // Update the mow session path in the repository
        await this.mowSessionRepository.updateMowSessionPath(mowerId, activeMowSession.id, newPath);
    }      
}