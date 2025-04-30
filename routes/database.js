const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { collection } = require('../models/User');
require('dotenv').config();
const { verify } = require('./auth.js')

const databaseName = process.env.databaseName;
const uri = `${process.env.BaseDatabaseUrl}/${databaseName}`;
const client = new MongoClient(uri);

router.get('/collections', verify, async (req, res) => {
    try {
        await client.connect();
        const db = client.db(databaseName);
        const Collections = (await db.listCollections().toArray())
            .map(col => col.name);

        const content = JSON.stringify(Collections);

        res.status(200).send(content);
    } catch (error){
        res.status(401).send(`Collectioon error: ${error}`);
    }
});



module.exports = router
