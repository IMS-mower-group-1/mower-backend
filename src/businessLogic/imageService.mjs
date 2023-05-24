import { ValidationError } from '../utils/errors.mjs';
import dateHandler from '../utils/dateHandler.mjs';

export default class ImageService {
    constructor({ imageRepository, mowerRepository }) {
        this.imageRepository = imageRepository;
        this.mowerRepository = mowerRepository
    }

    async mowerExists(mowerId){
        const mower = await this.mowerRepository.getMowerById(mowerId)
        return mower == null ? false : true
    }

    async uploadImageToStorage(mowerID, imageUInt8Array) {
        const formattedDateTime = dateHandler.formatDate()
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
    
        return await this.imageRepository.classifyImage(request);
    }

    async uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData) {
        try {
            return await this.imageRepository.uploadAvoidedCollisionData(mowerID, mowSessionID, avoidedCollisionData);
        } catch (error) {
            console.log(error)
            throw new ValidationError("Could not upload avoidedCollision data.")
        }
        
    }

    async getCollisionImageDownloadURL(imagePath) {
        try {
            return await this.imageRepository.getCollisionImageDownloadURL(imagePath)
        } catch(error) {
            if (error.code === 'storage/object-not-found') {
                throw new ValidationError("Image does not exist!")
            }
        }
    }
}
