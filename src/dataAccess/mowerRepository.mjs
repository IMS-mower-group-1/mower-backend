import { collection, doc, getDoc, addDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';

export default class MowerRepository {
    constructor({ db }) {
        this.db = db;
    }

    async getMowerById(mowerId){
        const mowerDocRef = doc(this.db, `mowers/${mowerId}`);
        const mowerDocSnap = await getDoc(mowerDocRef);

        if(mowerDocSnap.exists()){
            return {
                id: mowerDocSnap.id,
                ...mowerDocSnap.data(),
            }
        } else {
            return null
        }
    }
}