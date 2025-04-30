const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'SUpERsecRET';
authRouter.get('/getToken', (req, res) => {
    try {
        res.status(200).send(jwt.sign({'username': 'gangbi', 'password':'t123'}, SECRET_KEY, {expiresIn: '1m'}))
    } catch (e) {
        res.status(400).send(e);
    }
});

const verify = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(403).json({'msg':'Token gerekli!'});
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        console.log('decoded', decoded);
        if (err) {
            return res.status(401).json({'msg':`Error: ${err}`});
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    authRouter,
    verify
};