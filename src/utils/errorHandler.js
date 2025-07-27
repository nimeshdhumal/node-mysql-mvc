exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        // In production, you might not want to send the stack trace
        // error: process.env.NODE_ENV === 'production' ? {} : err.stack
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

module.exports = { CustomError, NotFoundError, BadRequestError };