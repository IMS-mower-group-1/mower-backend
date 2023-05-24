import { ValidationError } from "./errors.mjs";
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: "An internal server error occurred." });
    }
}

export default errorHandler;