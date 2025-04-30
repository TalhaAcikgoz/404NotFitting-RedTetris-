const express = require("express")
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

module.exports = router
