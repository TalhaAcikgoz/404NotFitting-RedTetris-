const express = require("express")
const User = require('../models/User')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("User List", {ulist: "none"});
})

router.get('/new', (req, res) => {
    res.status(200).send("Registration Form");
});

router.post('/new2', async (req, res) => {
    await newUser.save();
    console.log('new user saved', newUser);
    res.setHeader('Content-Type', 'application/json');
    const resp = new Response(200, true, "user saved.");
    res.end(JSON.stringify(resp));
});

// Yeni kullanıcı oluşturma endpoint’i
router.post('/new3', async (req, res) => {
    try {
        console.log(req);
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

        await user.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.', error: error });
    }
});

module.exports = router
