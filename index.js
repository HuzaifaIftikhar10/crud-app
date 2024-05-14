// Importing necessary modules
import express from "express"; // Importing Express for creating web server
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interaction
import bodyParser from "body-parser"; // Importing body-parser for parsing request bodies
import dotenv from "dotenv"; // Importing dotenv for environment variable management
import cors from "cors"; // Importing cors for enabling Cross-Origin Resource Sharing (CORS)
import route from "./routes/userRoute.js"; // Importing user routes

// Creating an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Loading environment variables from .env file
dotenv.config();

// Defining the port on which the server will run, fallback to port 7000 if PORT is not defined in environment variables
const PORT = process.env.PORT || 7000;

// MongoDB connection URL obtained from environment variables
const URL = process.env.mongodbURL;

// Connecting to MongoDB
mongoose.connect(URL).then(() => {
    // If connection is successful, log a success message
    console.log("Database connected successfully");
    
    // Start the server and listen on the defined port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error)); // Log any errors that occur during connection

// Setting up routes for the application
app.use("/api", route); // All routes defined in userRoute.js will be prefixed with /api

