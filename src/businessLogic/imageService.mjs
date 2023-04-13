import { ValidationError } from '../utils/errors.mjs';
import { formatDate } from '../utils/dateFormatter.mjs';

export default class ImageService {
    constructor({ imageRepository, mowSessionRepository }) {
        this.imageRepository = imageRepository;
        this.mowSessionRepository = mowSessionRepository

    }

    async mowerExists(mowerId){
        const mower = await this.mowerRepository.getMowerById(mowerId)
        return mower == null ? false : true
    }

    async uploadImageToStorage(mowerID, imageUInt8Array) {
        const currentDate = new Date();
        const formattedDateTime = formatDate(currentDate);
        const imageFilename = `${mowerID}/${formattedDateTime}.jpg`;

        const mowerExists = await this.mowerExists(mowerID)
        if(mowerExists){
            const fileName = await this.imageRepository.uploadImageToStorage(imageFilename, imageUInt8Array);
            return fileName;
        } else {
            throw new ValidationError("The mower does not exist")
        }
    }

    async classifyImage(imageUInt8Array) {
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
    

        const annotationResults = await this.imageRepository.classifyImage(request);
        return annotationResults;
    }

    async uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData) {
        await this.imageRepository.uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData);
    }
}
