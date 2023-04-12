export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
    }
}