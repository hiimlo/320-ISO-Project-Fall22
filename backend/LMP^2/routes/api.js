const express = require('express');
const router = express.Router();
const Data = require('../models/dummyNodeData');

router.get('/data', async (req, res, next) => {
    const data = await Data.find({});
    res.send(data)
});

router.get('/data/:node', async (req, res) => {
    const data = await Data.find({pnode_name: req.params.node});
    res.send(data)
})

module.exports = router;