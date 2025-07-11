const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'SUpERsecRET';

// JWT oluşturma fonksiyonu
const generateToken = (username) => {
    return jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
};

// Giriş yapma fonksiyonu
const login = async (req, res) => {
    const { username, password } = req.body;

    if (username == '' || password == '') {
        return res.status(400).json({error: 1, message: 'Username or password empty.' });
    }

    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(401).json({error: 1, message: 'Boyle bir kullanici bulunamadi' });
    }

    // Şifreyi kontrol et
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({error:1, message: 'Geçersiz username veya şifre' });
    }

    // JWT token oluştur
    const token = generateToken(user._id);

    return res.status(200).json({
        message: 'Başarıyla giriş yapıldı',
        token: token,
    });
};

// Token doğrulama middleware'i
const protect = (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ message: 'Token bulunamadı, giriş yapın.' });
    }
    
    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded.id; // Kullanıcı ID'sini request'e ekle
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Geçersiz token' });
    }
};

authRouter.post('/', login);

module.exports = {
    authRouter,
    protect,
    generateToken
};
