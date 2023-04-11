import { getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, doc, getDoc, collection } from "firebase/firestore"; 

export default class ImageRepository {
    constructor({ db, imageAnnotatorClient }) {
        this.db = db;
        this.imageAnnotatorClient = imageAnnotatorClient
    }

    uploadImageToStorage(imageFileName, uint8Array) {
        return new Promise(async (resolve, reject) => {
            const storage = getStorage();
            const storageReference = ref(storage, imageFileName);
    
            try {
                await uploadBytes(storageReference, uint8Array);
                resolve(imageFileName);
            } catch (e) {
                console.error("ERROR - Could not upload image to Storage...", e);
                reject(e);
            }
        });
    }

    classifyImage(request) {
        return new Promise(async (resolve, reject) => {
            try {
                const results = await this.imageAnnotatorClient.annotateImage(request);
                resolve(results[0].localizedObjectAnnotations);
            } catch (e) {
                console.error("ERROR - Could not classify image...", e);
                reject(e);
            }
        });
    }

    uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData) {
        return new Promise(async (resolve, reject) => {
            try {
                // 1. Fetch Reference to mower using MowerID
                const mowerDocRef = doc(this.db, `mowers/${mowerID}`)
                // const mowerDocSnap = await getDoc(mowerDocRef) 

                // 2. Fetch Reference document using mowSessionID
                const mowSessionDocRef = doc(mowerDocRef, `mowSessions/${mowSessionID}`)

                // // 3. Fetch Reference to avoidedCollisions collections
                const avoidedCollisionRef = collection(mowSessionDocRef, "avoidedCollisions")

                // 3. Add document to avoidedCollisions!
                await addDoc(avoidedCollisionRef, avoidedCollisionData)
                resolve()
            } catch (e) {
                console.error("ERROR - Could not upload collisionData to Firestore")
                reject(e)
            }
        })
    }

    //TODO: Add data-access functions
}
