const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scenario = new Schema({
    SCENARIO_ID: Number,
    SCENARIO_NAME: String,
    AUTHOR_GROUP_ID: Number,
    NODES: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Node'
        }
    ]
}, {
    versionKey: false
})

module.exports = mongoose.model('Scenario', Scenario);