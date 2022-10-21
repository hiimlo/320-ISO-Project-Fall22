if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
    require('dotenv').config(); // Load .env
  }

const csv = require('csvtojson');
const filepath = "dummy-data/dummy-node-data.csv"; //Location can be modified later to match actual data location.
const mongoose = require('mongoose');
const Data = require('./models/dummyNodeData'); //Schema can be modified later to match actual data schema.

const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

async function loadData() {
    try {
        const jsonArray = await csv().fromFile(filepath);
        await Data.deleteMany({}); //Empties out the table before importing in the data.

        for (i = 0; i < jsonArray.length; i++) {
            obj = jsonArray[i];
            const node = new Data({
                scenario_id: obj.SCENARIO_ID,
                pnode_name: obj.PNODE_NAME,
                period_id: obj.PERIOD_ID,
                lmp: obj.LMP
            });
            await node.save();
        } 
    } catch (e) {
        console.error(e);
    } finally {
        await db.close(); 
        console.log("Database disconnected");  
    }
}

loadData();
 