require('dotenv').config({ path: "config.env" });
const express = require('express');
const helmet = require('helmet');
const app = express();
const authRouter = require('./routes/auth');
const privateRouter = require('./routes/private');
const startServer = require('./config/server');
app.use(express.json());
app.use(helmet());


startServer();

app.use("/api/auth", authRouter);
app.use("/api/data", privateRouter);

