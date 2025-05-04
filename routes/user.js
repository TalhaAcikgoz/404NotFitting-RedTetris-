const express = require("express");
const User = require('../models/User.js')
const router = express.Router()
const { protect } = require('./login.js')

const me = async (req, res) => {
    const { user } = req.params

    if (!user) {
        res.status(404).json({message: ''})
    }
    const myUser = await User.findOne({username : user});

    if (!myUser) {
        res.status(404).json({message: 'User bulunamadi!?!??!'});
    }
    res.send("User List", {ulist: "none"});
}

router.get('/me/:user', protect, me);

module.exports = router