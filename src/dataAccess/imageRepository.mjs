import { getStorage, ref, uploadBytes } from "firebase/storage";

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
                resolve();
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

    //TODO: Add data-access functions
}
