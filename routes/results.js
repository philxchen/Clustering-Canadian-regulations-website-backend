const express = require('express');
const MongoClient = require("mongodb");
const conf = require('./conf.json');

const router = express.Router();

/* GET users listing. */
router.post('/', (req, res) => {
    MongoClient.connect(conf.db_url,
        {
            useNewUrlParser: true
        },
        (err, client) => {
            if (err) throw err;

            client.db('result').collection('runs')
                .findOne(req.body,
                    {
                        projection: {
                            _id: 0,
                            '2dpoints': 1,
                            labels: 1,
                            titles: 1
                        }
                    },
                    (err, result) => {
                        if (err) throw err;

                        // Transform to the format of [{"x": x, "y", y}]
                        const points = result['2dpoints'].map(xyArray => {
                            return {
                                'x': xyArray[0],
                                'y': xyArray[1]
                            }
                        });

                        res.send({
                            points: points,
                            labels: result.labels,
                            titles: result.titles
                        });
                    });
        });
});

module.exports = router;
