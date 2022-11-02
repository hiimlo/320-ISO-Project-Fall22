const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Scenario = require('../models/dummyScenarios');
const Data = require('../models/dummyNodes');
const Group = require('../models/dummyGroups');

// Gets all scenarios. BF - 3
router.get('/scenarios', async (req, res, next) => {
    const scenarios = await Scenario.find({});
    res.send(scenarios);
});

//Gets information about a specific scenario BF - 5
router.get('/scenarios/:id', async (req, res, next) => {
    const scenario = await Scenario.findOne({SCENARIO_ID: req.params.id});
    res.send(scenario);
});

//Gets all nodes associated with a specific scenario. Can be tuned by query parameters.
router.get('/scenarios/:id/nodes', async (req, res, next) => {
    const {metric, time, name} = req.query;
    const scenario = await Scenario.findOne({SCENARIO_ID: req.params.id}).populate('NODES');
    
    //First, filters by a provided node name if applicable. BF - 7
    //If no name parameter is provided, return all nodes.
    let nodes = _.groupBy(scenario.NODES, ({PNODE_NAME}) => PNODE_NAME)
    if (name != null) {
        nodes = { [name]: nodes[name]};
    }

    res.send(nodes);

    //Depending on what time grouping is selected, further sort the data. BF- 5 and BF - 6
    //If no time metric provided, default is "all".
    
    /* TODO: */

    // Ignore the code below. 

    /*
    nodes.map((node) => {
        console.log('hi');
        return 'hi';
    });

    res.send(nodes);
    
    let yearly = _.groupBy(nodes, function (obj) {
        console.log(obj[0]);
        PERIOD_ID.getFullYear()
        return "hi"
    });
    res.send(yearly);
    if (time == null) {
       return nodes;
    }
    
    
    yearly = _.invokeMap(yearly, function () {
        let avg = _.meanBy(this, 'LMP').toFixed(2);
        let i = this[0];
        return {
            SCENARIO_ID: i.SCENARIO_ID,
            PNODE_NAME: i.PNODE_NAME,
            PERIOD_ID: i.PERIOD_ID,
            LMP: avg,
            GROUPING: "YEARLY" 
        };       
    });
    res.send(nodes);
    
    if (time == 'yearly') {
        return _.invokeMap(yearly, (group) => _.meanBy(group, metric))
    }
    */
});

module.exports = router;