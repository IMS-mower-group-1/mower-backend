import { getDoc, doc } from "firebase/firestore";

export default class PositionRepository{
    constructor({ db }){
        this.db = db;
    }

    //TODO: Add data-access functions
    async getCoordinates(mowerID) {
        return new Promise(async (resolve, reject) => {
            try {
                const mowerDocRef = doc(this.db, `mowers/${mowerID}`)
                const mowerDocSnap = await getDoc(mowerDocRef)
                resolve(mowerDocSnap.data().position)
            } catch (e) {
                console.error("ERROR Repository - Could not fetch coordinates for mower with id " + mowerID)
                reject(e) 
            }


        })
    }
}