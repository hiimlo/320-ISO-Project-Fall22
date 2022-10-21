const express = require('express');
const router = express.Router();
const Data = require('../models/dummyNodeData');

router.get('/data', async (req, res, next) => {
    const data = await Data.find({});
    res.send(data)
});

router.get('/data/range', async (req, res) => {
    const nname = req.query.nname
    const start = req.query.start
    const end = req.query.end

    const data = await Data.find({
        pnode_name: nname,
        period_id: {
            $gte: start,
            $lte: end
        }
    });
    res.send(data)
})
//test link: http://localhost:3000/api/data/range?nname=.I.KENT%20%20%20%20345%202&start=17-JUL-2020%2001&end=17-JUL-2020%2015


router.get('/data/node', async (req, res) => {
    const data = await Data.find({
        pnode_name: req.query.nname,
        period_id: req.query.period
    });
    res.send(data)
})
// test link: http://localhost:3000/api/data/node?nname=.I.KENT%20%20%20%20345%202&period=17-JUL-2020%2001

router.get('/data/:node', async (req, res) => {
    const data = await Data.find({pnode_name: req.params.node});
    res.send(data)
})


module.exports = router;