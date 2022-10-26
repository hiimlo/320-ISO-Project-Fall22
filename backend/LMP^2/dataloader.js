if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
    require('dotenv').config(); // Load .env
  }

const csv = require('csvtojson');
const mongoose = require('mongoose');

const group_filepath = "dummy-data/dummy-groups.csv"; //Locations can be modified later to match actual data location.
const scenario_filepath = "dummy-data/dummy-scenarios.csv";
const node_filepath = "dummy-data/dummy-node-data.csv"; 

const Data = require('./models/dummyNodeData'); //Schemas can be modified later to match actual data schema.
const Scenario = require('./models/dummyScenario');
const Group = require('./models/dummyGroups');

const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Helper function for parsing ISO NE date strings: Ex: 17-JUL-2020 01
function dateConverter(str) {
    let [d, h] = str.split(' ');
    d = d.replaceAll('-', ' ');
    return new Date(d).setUTCHours(+h - 1);
}

async function loadData() {
    try {
        const groups = await csv().fromFile(group_filepath);
        const scenarios = await csv().fromFile(scenario_filepath);
        const nodes = await csv().fromFile(node_filepath);

        await Data.deleteMany({}); //Empties out the table before importing in the data.
        await Group.deleteMany({}); //Empties out the table before importing in the data.
        await Scenario.deleteMany({}); //Empties out the table before importing in the data.

        //Loads all Interest Groups.
        for (i = 0; i < groups.length; i++) {
            obj = groups[i];
            const group = new Group({
                GROUP_ID: Number(obj.GROUP_ID),
                GROUP_NAME: obj.GROUP_NAME,
            });
            await group.save();
        }

        //Loads all Scenarios and attach them to their Interest Groups.
        for (i = 0; i < scenarios.length; i++) {
            obj = scenarios[i];
            group = await Group.findOne({GROUP_ID: Number(obj.AUTHOR_GROUP_ID)});
            const scenario = new Scenario({
                SCENARIO_ID: Number(obj.SCENARIO_ID),
                SCENARIO_NAME: obj.SCENARIO_NAME,
                AUTHOR_GROUP_ID: Number(obj.AUTHOR_GROUP_ID), 
            });

            group.SCENARIOS.push(scenario);
            await scenario.save();
            await group.save();
        }
        
        //Loads all nodes, and attach them to their associated Scenario.
        for (i = 0; i < nodes.length; i++) {
            obj = nodes[i];
            scenario = await Scenario.findOne({SCENARIO_ID: Number(obj.SCENARIO_ID)});
            const data = new Data({
                SCENARIO_ID: Number(obj.SCENARIO_ID),
                PNODE_NAME: obj.PNODE_NAME,
                PERIOD_ID: dateConverter(obj.PERIOD_ID),
                LMP: Number(obj.LMP) 
            });
            scenario.NODES.push(data);
            await data.save();
            await scenario.save();
        }
 
    } catch (e) {
        console.error(e);
    } finally {
        await db.close(); 
        console.log("Database disconnected");  
    }
}

loadData();
 