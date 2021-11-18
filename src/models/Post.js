const { Schema, model } = require('mongoose');
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    //references the user id
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
module.exports = model('Post', PostSchema);