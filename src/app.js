require('dotenv').config({ path: "config.env" });
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/db')
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/post');
const cors = require("cors");
const compression = require('compression');
const morgan = require('morgan');
const serverErrorHandler = require('./error-handlers/500');


const app = express();
const PORT = process.env.PORT || 5000;


const start = () => {
    app.listen(PORT, () => console.log(`The Magic Happens On Port : ${PORT}`));
    connectDB();
}

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());


start();

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use(serverErrorHandler);
