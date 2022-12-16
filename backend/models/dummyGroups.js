const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Group = new Schema({
    GROUP_ID: Number,
    GROUP_NAME: String,
    SCENARIOS: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Scenario'
        }
    ]
}, {
    versionKey: false
})

module.exports = mongoose.model('Group', Group);