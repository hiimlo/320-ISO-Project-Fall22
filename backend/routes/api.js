const express = require('express')
const router = express.Router()
const _ = require('lodash')

const Scenario = require('../models/dummyScenarios')
const Data = require('../models/dummyNodes')
const Group = require('../models/dummyGroups')
const { values } = require('lodash')

// general endpoint
router.get('/node', async (req, res, next) => {
    const nname = req.query.nname
    const scenario = req.query.scenario
    const start = req.query.start ?? '0000'
    const end = req.query.end ?? '2100'

    const filter = [{}]
    if (nname != null) {
        filter.push({ PNODE_NAME: nname })
    }
    if (scenario != null) {
        filter.push({ SCENARIO_ID: scenario })
    }
    filter.push({
        PERIOD_ID: {
            $gte: start,
            $lte: end
        }
    })
    //default all nodees, all scenarios, all times

    const data = await Data.find({ $and: filter })
    if (data.length === 0) {
        res.status(404).send('No data found for the given parameters')
    } else {
        res.send(data)
    }
})

//Get a list of all node names.
router.get('/nodes', async (req, res, next) => {
    const nodeNames = await Data.distinct('PNODE_NAME')
    res.send(nodeNames)
})

// Gets all scenarios. BF - 3
router.get('/scenarios', async (req, res, next) => {
    const scenarios = await Scenario.find({})
    res.send({ SCENARIOS: scenarios }) //Modified to be consistent in return objects.
})

//Gets information about a specific scenario BF - 5
router.get('/scenarios/:id', async (req, res, next) => {
    const scenario = await Scenario.findOne({ SCENARIO_ID: req.params.id })
    res.send(scenario)
})

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
    const metric = req.query.metric ?? 'LMP'
    const sort = req.query.sort ?? 'NONE'
    const group = req.params.grouping
    const id = req.query.id //.I.KENT++++345+2

    //Populates all the nodes associated with the scenario.
    const scenario = await Scenario.findOne({ SCENARIO_ID: req.params.id }).populate('NODES')

    //It starts as an array, but it becomes a JSON object literal in the end.
    let nodes = scenario.NODES

    //Filters by the specified grouping if applicable. Narrowing down to a specific ID if the field id is provided.
    if (group != null) {
        nodes = _.groupBy(scenario.NODES, (node) => node[group]) //Using Lo Dash cause Lo is based
        if (id != null) {
            nodes = { [id]: nodes[id] }
        }
    } else {
        nodes = { NODES: nodes } // For consistency
    }

    toRet = {}
    //Groups the data by the given time grouping.
    _.forEach(Object.keys(nodes), (nodeGroup) => {
        nodes[nodeGroup] = _.groupBy(nodes[nodeGroup], function (node) {
            //Deconstructs stuff for comparison
            const [year, mon, day, hour] = node.PERIOD_ID.toISOString().split(/[-T:]/)
            const quarter = Math.floor((2 + parseInt(mon)) / 3)
            switch (sort) {
                case 'ALL':
                    return 'ALL'
                case 'YEAR':
                    return `${year}`
                case 'QUARTER':
                    return `${year}-Q${quarter}`
                case 'MONTH':
                    return `${year}-${mon}`
                case 'DAY':
                    return `${year}-${mon}-${day}`
                default: //Hourly, uneditted
                    return year + '-' + mon + '-' + day + ': ' + hour
            }
        })

        nodeData = []
        //Performs aggregate functions on the choosen metric.
        _.forEach(Object.keys(nodes[nodeGroup]), (timeGroup) => {
            //Converts all the nodes to just the values specified by the give metric.
            const values = _.map(nodes[nodeGroup][timeGroup], (node) => node[metric]).sort((x, y) => x - y)
            const mid = Math.floor(values.length / 2) //For Median calculation
            const mean = values.reduce((sum, val) => sum + val, 0) / values.length //For Mean and Standard Deviation calculation
            nodeData.push({
                TIME: timeGroup,
                MEAN: Math.round(mean * 100) / 100,
                MEDIAN: Math.round(values.length % 2 != 0 ? values[mid] : ((values[mid - 1] + values[mid]) / 2) * 100) / 100,
                STD: Math.round(values.reduce((sum, val) => Math.sqrt(sum ** 2 + (val - mean) ** 2), 0) * 100) / 100
            })
        })
        nodeData = nodeData.sort(function (a, b) {
            var x = a.TIME
            var y = b.TIME
            return x < y ? -1 : x > y ? 1 : 0
        })
        toRet[nodeGroup] = nodeData
    })
    //Finally sends the JSON object literal.
    res.send(toRet)
}

let search2 = async (req, res, next) => {
    const metric = req.query.metric ?? 'LMP'
    const sort = req.query.sort ?? 'NONE'
    // const group = req.params.grouping
    const nname = req.query.id ?? '.Z.NORTH' //.I.KENT++++345+2
    const scenario_id = parseInt(req.params.id)

    let node_data = await Data.findOne({ PNODE_NAME: nname })
    node_data = node_data.TIME_SERIES.filter((e) => e.SCENARIO_ID === scenario_id)
    // node_data = node_data.groupBy((e) => e.PNODE_NAME)
    grouped_data = _.groupBy(node_data, (e) => {
        const [year, mon, day, hour] = e.PERIOD_ID.toISOString().split(/[-T:]/)
        const quarter = Math.floor((2 + parseInt(mon)) / 3)
        switch (sort) {
            case 'ALL':
                return 'ALL'
            case 'YEAR':
                return `${year}`
            case 'QUARTER':
                return `${year}-Q${quarter}`
            case 'MONTH':
                return `${year}-${mon}`
            case 'DAY':
                return `${year}-${mon}-${day}`
            default: //Hourly, uneditted
                return year + '-' + mon + '-' + day + ': ' + hour
        }
    })

    node_data = []
    Object.keys(grouped_data).forEach((time) => {
        const values = grouped_data[time].map((e) => e[metric])
        const mid = Math.floor(values.length / 2) //For Median calculation
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length //For Mean and Standard Deviation calculation

        node_data.push({
            TIME: time,
            MEAN: Math.round(mean * 100) / 100,
            MEDIAN: Math.round(values.length % 2 != 0 ? values[mid] * 100 : ((values[mid - 1] + values[mid]) / 2) * 100) / 100,
            STD: Math.round(Math.sqrt(values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length) * 100) / 100
        })
    })
    node_data = node_data.sort(function (a, b) {
        var x = a.TIME
        var y = b.TIME
        return x < y ? -1 : x > y ? 1 : 0
    })
    toRet = {}
    toRet[nname] = node_data
    res.send(toRet)
}

router.get('/heatmap', async (req, res, next) => {
    const metric = req.query.metric ?? 'LMP'
    const nname = req.query.nname ?? '.Z.NORTH' //.I.KENT++++345+2
    const scenario_id_1 = parseInt(req.query.s1)
    const scenario_id_2 = parseInt(req.query.s2)

    const node_data = await Data.findOne({ PNODE_NAME: nname })
    let s1_data = _.groupBy(
        node_data.TIME_SERIES.filter((e) => e.SCENARIO_ID === scenario_id_1),
        (e) => {
            return e.PERIOD_ID.toISOString()
        }
    )
    Object.keys(s1_data).forEach((time) => {
        s1_data[time] = s1_data[time][0][metric]
    })
    let s2_data = _.groupBy(
        node_data.TIME_SERIES.filter((e) => e.SCENARIO_ID === scenario_id_2),
        (e) => {
            return e.PERIOD_ID.toISOString()
        }
    )
    Object.keys(s2_data).forEach((time) => {
        s2_data[time] = s2_data[time][0][metric]
    })

    let matrixMap = {}
    Object.keys(s1_data).forEach((time) => {
        // conditional cuz can only calculate APE if it exists in other scenario
        if (time in s2_data) {
            matrixMap[time] = Math.round(((s1_data[time] - s2_data[time]) / s1_data[time]) * 100 * 100) / 100
        }
    })

    // need hour to hour APE, then take MAX
    let matrix = []
    for (var i = 0; i < 24; i++) {
        matrix[i] = []
        for (var j = 0; j < 12; j++) {
            matrix[i][j] = []
        }
    }

    // pushing each point to the matrix based on (month, hour) combination
    Object.keys(matrixMap).forEach((time) => {
        let [year, mon, day, hour] = time.split(/[-T:]/)
        mon = parseInt(mon) - 1
        hour = parseInt(hour)
        matrix[hour][mon].push(matrixMap[time])
    })

    matrix = matrix.map((row) => {
        return row.map((col) => {
            if (col.length == 0) {
                return col
            }
            let max = 0
            let absMax = 0
            col.forEach((e) => {
                if (Math.abs(e) > absMax) {
                    max = e
                }
            })
            return max
        })
    })

    res.send(matrix)
})

//For when no grouping criteria is specified, the entire dataset is treated as one group.
router.get('/scenarios/:id/nodes', search2)
router.get('/scenarios/:id/nodes/:grouping', search2)

module.exports = router
