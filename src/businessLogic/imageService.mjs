export default class ImageService {
    constructor({ imageRepository }) {
        this.imageRepository = imageRepository;
    }

    uploadImageToStorage(mowerID, imageUInt8Array) {
        return new Promise(async (resolve, reject) => {
            const currentDate = new Date();

            // Extract the individual components of the date and time
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            // Format the date and time string
            const formattedDateTime = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
            const imageFilename = `${mowerID}/${formattedDateTime}.jpg`

            try {
                const fileName = await this.imageRepository.uploadImageToStorage(imageFilename, imageUInt8Array)
                resolve(fileName)
            } catch(e) {
                reject(e)
            }
        })
    }

    classifyImage(imageUInt8Array) {
        return new Promise(async (resolve, reject) => {
            const features = [
                {
                    type: "OBJECT_LOCALIZATION",
                    maxResults: 1,
                },
            ];
    
            const request = {
                image: {
                    content: Buffer.from(imageUInt8Array).toString("base64"),
                },
                features: features,
            };

            try {
                const annotationResults = this.imageRepository.classifyImage(request)
                resolve(annotationResults)
            } catch(e) {
                reject(e)
            }
        })
    }

    //TODO: Add business-logic
}
