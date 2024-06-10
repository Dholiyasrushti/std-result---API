var mongoose = require('mongoose');
const { student } = require('../usercontroller/usercontroller');
var studentschema = new mongoose.Schema({
    name:{
        type:String
    },
    div:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"division"
    },
    roll_no:{
        type:Number
    }
})

module.exports = mongoose.model('student',studentschema) ;