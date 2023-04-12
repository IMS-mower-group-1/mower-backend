import { collection, doc, getDoc, addDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';

export default class MowSessionRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getAllSessionsByMowerId(mowerId) {
        const sessionsCollectionRef = collection(this.db, `mowers/${mowerId}/mowSessions`);
        const sessionsSnapshot = await getDocs(sessionsCollectionRef);
        const sessions = [];

        sessionsSnapshot.forEach((sessionDoc) => {
            sessions.push({
                id: sessionDoc.id,
                ...sessionDoc.data(),
            });
        });

        return sessions;
    }

    async getActiveSession(mowerId) {
        const sessionsCollectionRef = collection(this.db, `mowers/${mowerId}/mowSessions`);
        const activeSessionQuery = query(sessionsCollectionRef, where('end', '==', null));
        const activeSessionSnapshot = await getDocs(activeSessionQuery);
    
        if (activeSessionSnapshot.empty) {
            return null;
        }
    
        return {
            id: activeSessionSnapshot.docs[0].id,
            ...activeSessionSnapshot.docs[0].data(),
        };
    }

    async startMowSessionByMowerId(mowerId, sessionData) {
        // Get the specified mower document by its ID
        const mowerRef = doc(this.db, `mowers/${mowerId}`);

        // Add a new document to the nested sessions collection
        const sessionsCollection = collection(mowerRef, 'mowSessions');
        const newSessionRef = await addDoc(sessionsCollection, sessionData);
        return newSessionRef.id;
    }

    async endMowSession(mowerId, sessionId, endDate) {
        const sessionDocRef = doc(this.db, `mowers/${mowerId}/mowSessions/${sessionId}`);
        await updateDoc(sessionDocRef, { end: endDate });
    }

    async updateMowSessionPath(mowerId, sessionId, newPath) {
        const sessionDocRef = doc(this.db, `mowers/${mowerId}/mowSessions/${sessionId}`);
        await updateDoc(sessionDocRef, { path: newPath });
    }
}