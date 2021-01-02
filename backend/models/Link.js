import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    originalLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
    statistics: {
        source: {
            type: String
        },
        views: {
            type: Number
        } 
    }
});

const Link = new mongoose.model('Link', linkSchema);

export default Link;