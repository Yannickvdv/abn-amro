const express = require('express')
const router = express.Router()

const neo4j_calls = require('./../database/neo4j_calls.js');

router.get('/', function (req, res, next) {
    neo4j_calls.get_all_nodes()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;