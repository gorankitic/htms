const express = require("express");
const colors = require("colors/safe");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const cabinRouter = require("./routes/cabinRoutes");
const settingsRouter = require("./routes/settingsRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const guestRouter = require("./routes/guestRoutes");

require("dotenv").config();

// Initialize express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// (Routers)
app.use("/api/users", userRouter);
app.use("/api/cabins", cabinRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/guests", guestRouter);
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