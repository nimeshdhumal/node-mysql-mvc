const errorHandler = (err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    const error = err.errors

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: error
    });
};

class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

class BadRequestError extends CustomError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

module.exports = { errorHandler, CustomError, NotFoundError, BadRequestError };