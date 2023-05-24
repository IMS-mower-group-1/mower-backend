import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, doc, getDoc, collection } from "firebase/firestore"; 

export default class ImageRepository {
    constructor({ db, imageAnnotatorClient }) {
        this.db = db;
        this.imageAnnotatorClient = imageAnnotatorClient
    }

    async uploadImageToStorage(imageFileName, uint8Array) {
        const storage = getStorage();
        const storageReference = ref(storage, imageFileName);
        await uploadBytes(storageReference, uint8Array);
        return imageFileName;
    }
    
    async classifyImage(request) {
        const results = await this.imageAnnotatorClient.annotateImage(request);
        return results[0].localizedObjectAnnotations;
    }
    
    async uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData) {
        // 1. Create mowSession document reference using mowerID & mowSessionID
        const mowSessionDocRef = doc(this.db, `mowers/${mowerID}/mowSessions/${mowSessionID}`)
    
        // 2. Create Reference to avoidedCollisions collections
        const avoidedCollisionRef = collection(mowSessionDocRef, "avoidedCollisions")
    
        // 3. Add document to avoidedCollisions!
        await addDoc(avoidedCollisionRef, avoidedCollisionData);
    }

    async getCollisionImageDownloadURL(imagePath) {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        return await getDownloadURL(imageRef)
    }

    //TODO: Add data-access functions
}
