import { collection, doc, getDoc, addDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';

export default class MowSessionRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getAllMowSessionsByMowerId(mowerId) {
        const mowSessionsCollectionRef = collection(this.db, `mowers/${mowerId}/mowSessions`);
        const mowSessionsSnapshot = await getDocs(mowSessionsCollectionRef);
    
        const mowSessions = [];
    
        for (const mowSessionDoc of mowSessionsSnapshot.docs) {
            const avoidedCollisionsCollectionRef = collection(this.db, `mowers/${mowerId}/mowSessions/${mowSessionDoc.id}/avoidedCollisions`);
            const avoidedCollisionsSnapshot = await getDocs(avoidedCollisionsCollectionRef);
    
            const mowSessionData = {
                id: mowSessionDoc.id,
                ...mowSessionDoc.data(),
                avoidedCollisions: []
            };
    
            avoidedCollisionsSnapshot.forEach((avoidedCollisionDoc) => {
                mowSessionData.avoidedCollisions.push({
                    id: avoidedCollisionDoc.id,
                    ...avoidedCollisionDoc.data()
                })
            });
    
            mowSessions.push(mowSessionData);
        }
    
        return mowSessions;
    }

    async getActiveMowSession(mowerId) {
        const MowSessionsCollectionRef = collection(this.db, `mowers/${mowerId}/mowSessions`);
        const activeMowSessionQuery = query(MowSessionsCollectionRef, where('end', '==', null));
        const activeMowSessionSnapshot = await getDocs(activeMowSessionQuery);
    
        if (activeMowSessionSnapshot.empty) {
            return null;
        }
    
        return {
            id: activeMowSessionSnapshot.docs[0].id,
            ...activeMowSessionSnapshot.docs[0].data(),
        };
    }

    async startMowSessionByMowerId(mowerId, mowSessionData) {
        // Get the specified mower document by its ID
        const mowerRef = doc(this.db, `mowers/${mowerId}`);

        // Add a new document to the nested sessions collection
        const mowSessionsCollection = collection(mowerRef, 'mowSessions');
        const newMowSessionRef = await addDoc(mowSessionsCollection, mowSessionData);
        return newMowSessionRef.id;
    }

    async endMowSession(mowerId, mowSessionId, endDate) {
        const mowSessionDocRef = doc(this.db, `mowers/${mowerId}/mowSessions/${mowSessionId}`);
        await updateDoc(mowSessionDocRef, { end: endDate });
    }

    async updateMowSessionPath(mowerId, mowSessionId, newPath) {
        const mowSessionDocRef = doc(this.db, `mowers/${mowerId}/mowSessions/${mowSessionId}`);
        await updateDoc(mowSessionDocRef, { path: newPath });
    }
}