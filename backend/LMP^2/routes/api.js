const express = require('express');
const router = express.Router();
const Data = require('../models/dummyNodeData');

router.get('/data', async (req, res, next) => {
    const {pname, scenario, start, end} = req.query;
    const data = await Data.find({pnode_name: pname, scenario_id: scenario, period_id: {
        $gte: start,
        $lte: end
    } });
    res.send(data)
});

router.get('/data/:node', async (req, res) => {
    const data = await Data.find({pnode_name: req.params.node});
    res.send(data)
})

module.exports = router;