const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Node = new Schema(
    {
        PNODE_NAME: String,
        TIME_SERIES: [
            {
                SCENARIO_ID: Number,
                PERIOD_ID: Date,
                LMP: Number
            }
        ]
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Node', Node)
