import { updateDoc, getDoc, doc } from "firebase/firestore";

export default class PositionRepository{
    constructor({ db }){
        this.db = db;
    }

    async getCoordinates(mowerID) {

        const mowerDocRef = doc(this.db, `mowers/${mowerID}`)
        const mowerDocSnap = await getDoc(mowerDocRef)
        return(mowerDocSnap.data().position)
    }

    async updateCoordinates(mowerID, newPosition) {
        const mowerDocRef = doc(this.db, `mowers/${mowerID}`)
        await updateDoc(mowerDocRef, { position: newPosition });
    }
}