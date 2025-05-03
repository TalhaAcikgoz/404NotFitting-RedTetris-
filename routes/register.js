const express = require("express")
const User = require('../models/User.js')
const { generateToken } = require('./login.js')
const router = express.Router()

// Yeni kullanıcı oluşturma endpoint’i
const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    // E-posta ve şifrenin mevcut olup olmadığını kontrol et
    if (!username || !password || !email) {
        return res.status(400).json({ error: 1, message: 'Inputs are empty.' });
    }

    // Aynı e-posta ile bir kullanıcı olup olmadığını kontrol et
    const existingUsernameUser = await User.findOne({ username });
    const existingEmailUser = await User.findOne({ email });
    
    if (existingUsernameUser || existingEmailUser) {
        return res.status(400).json({ error: 1, message: 'Username and E-mail already exist.' });
    }
    
    // Yeni kullanıcıyı oluştur
    const user = new User({
        username,
        email,
        password
    });
        
    try {
        await user.save();
        const token = generateToken(user.username);
        res.json({ status: 201, token: token, message: 'Kullanıcı başarıyla oluşturuldu' });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.', error: error.message });
    }
}


router.post('/register', register);

module.exports = router
