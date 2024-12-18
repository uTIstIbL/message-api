const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const onlinestatus = new Schema({
    status:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Online", onlinestatus)