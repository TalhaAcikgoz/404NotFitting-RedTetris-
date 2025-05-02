const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Response = require('./models/Response');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const mongoURI = "mongodb://localhost:27017/RedTetris";
const app = express();

console.log('env', process.env.BaseDatabaseUrl);

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB'ye baglandi."))
.catch(err => console.log("MongoDB baglanti hatasi:", err));

app.use(express.static(__dirname + '/public'));

// MIDDLEWARES

logging = (req, res, next) => {
    console.log(`[${new Date().toUTCString()}] %c${req.method} - %c${req.url}`, 'color:red', 'color:white');
    next();
}

app.use(logging);

const port = 3000;
const databaseRouter = require('./routes/Database.js');
const usersRouter = require('./routes/users.js');
const {authRouter}  = require('./routes/auth.js');

app.use('/users', usersRouter);
app.use('/database', databaseRouter);
app.use('/login', authRouter);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
