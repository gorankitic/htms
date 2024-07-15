const express = require("express");
const colors = require("colors/safe");
const mongoose = require("mongoose");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const cabinRouter = require("./routes/cabinRoutes");

require("dotenv").config();

// Initialize express application
const app = express();

// Middlewares
app.use(express.json());

// (Routers)
app.use("/api/cabins", cabinRouter);
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
(async () => {
    try {
        // Connect to MongoDb
        await mongoose.connect(process.env.MONGO_URI);
        console.log(colors.bgGreen.bold("Database connected successfully."));
        // Start listening for http requests
        app.listen(port, () => {
            console.log(colors.bgGreen.bold(`Server is up in ${process.env.NODE_ENV} mode on port ${process.env.PORT}.`));
        });
    } catch (error) {
        console.log(colors.bgRed.bold(error.message));
    }
})();