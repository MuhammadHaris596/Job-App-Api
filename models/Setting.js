const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    web_Title: {
        type: String,
        required: true
    },
    web_Footer: {
        type: String,
        required: true
    },

    web_Logo: {
        type: String
    },

    web_LogoID: {
        type: String
    }
});

module.exports = mongoose.model('Setting', settingSchema);
