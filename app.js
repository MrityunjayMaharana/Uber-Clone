const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/user.routes');
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require('./db/db');

dbConnect(); // Database connection

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Routes
app.use('/users', userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the error stack to the console
    res.status(500).send({ message: "Something went wrong, please try again later." });
});

module.exports = app;
