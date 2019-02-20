const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const conf = require('./conf.json');

const router = express.Router();

/* GET available params listing. */
router.get('/', (req, res) => {
    MongoClient.connect(conf.db_url, {
            useNewUrlParser: true
        },
        (err, client) => {
            if (err) throw err;

            const db = client.db('result');
            db.collection('runs')
                .find()
                .project({
                    _id: 0,
                    model: 1,
                    algorithm: 1
                })
                .toArray((err, result) => {
                    if (err) throw err;

                    res.send(result);
                });
        });
});

module.exports = router;
