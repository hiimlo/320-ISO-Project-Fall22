const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeData = new Schema({
    scenario_id: String,
    pnode_name: String,
    period_id: String,
    lmp: String
}, {
    versionKey: false
})

module.exports = mongoose.model('NodeData', NodeData);