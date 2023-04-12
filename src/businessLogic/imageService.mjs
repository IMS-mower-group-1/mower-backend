import { ValidationError } from '../utils/errors.mjs';
import { formatDate } from '../utils/dateFormatter.mjs';

export default class ImageService {
    constructor({ imageRepository }) {
        this.imageRepository = imageRepository;
    }

    uploadImageToStorage(mowerID, imageUInt8Array) {
        return new Promise(async (resolve, reject) => {
            const currentDate = new Date();
            const formattedDateTime = formatDate(currentDate)
            const imageFilename = `${mowerID}/${formattedDateTime}.jpg`;
            try {
                const fileName =
                    await this.imageRepository.uploadImageToStorage(
                        imageFilename,
                        imageUInt8Array
                    );
                resolve(fileName);
            } catch (e) {
                reject(e);
            }
        });
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
                const annotationResults =
                    this.imageRepository.classifyImage(request);
                resolve(annotationResults);
            } catch (e) {
                reject(e);
            }
        });
    }

    async uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData) {
        return new Promise(async (resolve, reject) => {
            // Validation for avoidedCollisionData object

            try {
                await this.imageRepository.uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData);
                resolve()
            } catch(e) {
                console.error("ERROR - Could not upload avoidedCollisionData for mowSessionID : " + mowSessionID)
                reject(e)
            }
            
        });
    }

    //TODO: Add business-logic
}
