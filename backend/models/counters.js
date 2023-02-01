const {Schema, model} = require('mongoose');

const countersSchema = new Schema({
    conversation_id: {type: String},
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    unreadMessages: [{
        user: {type: String},
        count: {type: Number}
    }]
})

module.exports = model('Counters', countersSchema);