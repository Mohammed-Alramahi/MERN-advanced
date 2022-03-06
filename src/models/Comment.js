const { Schema, model } = require('mongoose');
const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})
module.exports = model('Comment', CommentSchema);