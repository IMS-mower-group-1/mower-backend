import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export default class MowSessionRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getAllSessionsByMowerId(mowerId) {
        // Get the specified mower document by its ID
        const mowerRef = doc(this.db, 'mower', mowerId);

        // Query the nested sessions collection
        const sessionsCollection = collection(mowerRef, 'mowSession');
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
}