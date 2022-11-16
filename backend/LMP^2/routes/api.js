const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Scenario = require('../models/dummyScenarios');
const Data = require('../models/dummyNodes');
const Group = require('../models/dummyGroups');
const { values } = require('lodash');

// Gets all scenarios. BF - 3
router.get('/scenarios', async (req, res, next) => {
    const scenarios = await Scenario.find({});
    res.send({SCENARIOS: scenarios}); //Modified to be consistent in return objects.
});

//Gets information about a specific scenario BF - 5
router.get('/scenarios/:id', async (req, res, next) => {
    const scenario = await Scenario.findOne({SCENARIO_ID: req.params.id});
    res.send(scenario);
});

let search = async (req, res, next) => { 
    /*
        How this works:

        Group:  Indicates how the node data is being clustered. By name, region, etc... 
                Right now, we only have names. Default: None.
        Sort:   Indicates how we will group the data. All, yearly, etc...
                Should be able to support daily, monthly, quarterly, yearly, and all. Default: Hourly.
        Metric: Indicates what metric we will report on. 
                Right now, should just report on LMP. Default: LMP.
        Id:     Relates to how the node data is being clustered. A specific ID associated with the clustering
                method will return information just on that cluster. Ex: Group = PNODE_NAME, id = 'KENT' will
                report for nodes with just the PNODE_NAME = 'KENT'. 
                Id does nothing if no Group is specified (Cause all data is treated as one set)

        What it will return:

        Nested JSON object literals in this format:
        { 
            NodeGrouping (Ex: If group = PNODE_NAME, NodeGrouping = UN.ALTA 345 UALT)
            {
                TimeGrouping (Ex: If sort = QUARTER, TimeGrouping = 2022-Q1 )
                {    
                   MEAN: Average of the chosen metric for all nodes in this cluster.
                   MEDIAN: Median of the chosen metric for all nodes in this cluster.
                   STD: Standard Deviation of the chosen metric for all nodes in this cluster.
                }
            }
        }
    */
    const metric = req.query.metric ?? "LMP";
    const sort = req.query.sort ?? "NONE";
    const group = req.params.grouping;
    const id = req.query.id; //.I.KENT++++345+2

    //Populates all the nodes associated with the scenario.
    const scenario = await Scenario.findOne({SCENARIO_ID: req.params.id}).populate('NODES');

    //It starts as an array, but it becomes a JSON object literal in the end.
    let nodes = scenario.NODES;

    //Filters by the specified grouping if applicable. Narrowing down to a specific ID if the field id is provided.
    if (group != null) {
        nodes = _.groupBy(scenario.NODES, (node) => node[group]) //Using Lo Dash cause Lo is based
        if (id != null) {
            nodes = {[id]: nodes[id]};
        }
    } else {
        nodes = {"NODES": nodes}; // For consistency  
    }

    //Groups the data by the given time grouping. 
    _.forEach(Object.keys(nodes), (nodeGroup) => {
        nodes[nodeGroup] = _.groupBy(nodes[nodeGroup], function (node) {
            //Deconstructs stuff for comparison
            const [year, mon, day, hour] = node.PERIOD_ID.toISOString().split(/[-T:]/);
            console.log(hour);
            const quarter = Math.floor((2 + parseInt(mon)) / 3);
            switch (sort) {
                case "ALL":
                    return "ALL";
                case "YEAR":
                    return `${year}`;
                case "QUARTER":
                    return `${year}-Q${quarter}`;
                case "MONTH":
                    return `${year}-${mon}`;
                case "DAY":
                    return `${year}-${mon}-${day}`;
                default: //Hourly, uneditted
                    return year + "-" + mon + "-" + day + ": " + hour;
            }
        }); 
        
        //Performs aggregate functions on the choosen metric.
        _.forEach(Object.keys(nodes[nodeGroup]), (timeGroup) => {
            //Converts all the nodes to just the values specified by the give metric.
            const values = _.map(nodes[nodeGroup][timeGroup], (node) => node[metric]).sort((x, y) => x - y);
            const mid = Math.floor(values.length / 2); //For Median calculation
            const mean = values.reduce((sum, val) => sum + val, 0) / values.length; //For Mean and Standard Deviation calculation
            nodes[nodeGroup][timeGroup] = 
            {
                MEAN: mean,
                MEDIAN: values.length % 2 != 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2,
                STD: values.reduce((sum, val) => Math.sqrt(sum ** 2 + (val - mean) ** 2), 0)
            };
        });
    });

    //Finally sends the JSON object literal.
    res.send(nodes);

}

//For when no grouping criteria is specified, the entire dataset is treated as one group.
router.get('/scenarios/:id/nodes', search);
router.get('/scenarios/:id/nodes/:grouping', search);



module.exports = router;