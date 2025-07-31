const jwt = require('jsonwebtoken');
const { CustomError } = require('./errorHandler');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    try {
        if (!token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request
            next();
        }
    } catch (error) {
        return next(new CustomError('Invalid or expired token', 403));
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new CustomError('You are not authorized to access this route', 403));
        }
        next();
    };
};