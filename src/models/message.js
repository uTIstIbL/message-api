const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    message:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Messasges", Message)