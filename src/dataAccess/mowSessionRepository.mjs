import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

export default class MowSessionRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getAllSessionsByMowerId(mowerId) {
        const mower = collection(this.db, 'mower');
        const snapshot = await getDocs(mower);
        const mowers = [];
    
        snapshot.forEach((doc) => {
          mowers.push({ id: doc.id, ...doc.data() });
        });
    
        return mowers;
    }
}