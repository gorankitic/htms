
// Send more error details in development mode
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}

// Send error to client when in production mode
const sendErrorProd = (err, res) => {
    // Operational, trusted error (exception)
    // Send nice, human readable message to client side
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming or other unknown error, don't leak too much details
        // 1. Log error
        console.log("❌ERROR: ", err);
        // 2. Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went wrong."
        });
    }
}

// Global error handling middleware
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Separate errors in development and production mode
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = Object.assign(err);

        sendErrorProd(error, res);
    }
}