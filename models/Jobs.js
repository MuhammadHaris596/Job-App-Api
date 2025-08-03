const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    imageID: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = mongoose.model('Job', jobSchema);
