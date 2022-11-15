const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Node = new Schema({
    SCENARIO_ID: Number,
    PNODE_NAME: String,
    PERIOD_ID: Date,
    LMP: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('Node', Node);