const express = require("express")
const User = require('../models/User')
const router = express.Router()

router.get('/me', async (req, res) => {
    const { user } = req.params

    if (!user) {
        res.status(404).json({message: ''})
    }
    const myUser = await User.findOne({username : user});

    if (!myUser) {
        res.status(404).json({message: 'User bulunamadi!?!??!'});
    }
    res.send("User List", {ulist: "none"});
})

// Yeni kullanıcı oluşturma endpoint’i
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // E-posta ve şifrenin mevcut olup olmadığını kontrol et
    if (!username || !password) {
        return res.status(400).json({ message: 'Username ve şifre gereklidir.' });
    }

    // Aynı e-posta ile bir kullanıcı olup olmadığını kontrol et
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu username zaten kullanılıyor.' });
        }
        
        // Yeni kullanıcıyı oluştur
        const user = new User({
            username,
            password
        });
        
    try {
        await user.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.', error: error.message });
    }
});

module.exports = router
