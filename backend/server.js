const express = require("express");
const colors = require("colors/safe");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

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