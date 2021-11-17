const express = require('express');
const server = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI, () => {
        console.log("MongoDB connected");
    });
}
const start = () => {
    server.listen(PORT, () => console.log(`The Magic Happens On Port : ${PORT}`));
    connectDB();
}

module.exports = start;