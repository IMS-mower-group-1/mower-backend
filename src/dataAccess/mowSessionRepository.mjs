import { collection, doc, getDoc, addDoc, getDocs, query, where } from 'firebase/firestore';

export default class MowSessionRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getAllSessionsByMowerId(mowerId) {
        // Get the specified mower document by its ID
        const mowerRef = doc(this.db, `mowers/${mowerId}`);

        // Query the nested sessions collection
        const sessionsCollection = collection(mowerRef, 'mowSessions');
        const sessionsSnapshot = await getDocs(sessionsCollection);
        const sessions = [];

        sessionsSnapshot.forEach((sessionDoc) => {
            sessions.push({
                id: sessionDoc.id,
                ...sessionDoc.data(),
            });
        });

        return sessions;
    }

    async startMowSessionByMowerId(mowerId, sessionData) {
        // Get the specified mower document by its ID
        const mowerRef = doc(this.db, `mowers/${mowerId}`);

        // Add a new document to the nested sessions collection
        const sessionsCollection = collection(mowerRef, 'mowSessions');
        const newSessionRef = await addDoc(sessionsCollection, sessionData);
        
        // Create an empty subcollection called 'avoidedCollisions' within the session
        collection(newSessionRef, 'avoidedCollisions');

        console.log(`New session added with ID: ${newSessionRef.id}`);
    }
}