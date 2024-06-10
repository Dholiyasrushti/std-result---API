var mongoose = require('mongoose');

var divisionschema = new mongoose.Schema({
    std:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"standard"
    },
    div :{
        type:String
    },
    staff_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"staff"
    }
})

module.exports = mongoose.model('division',divisionschema);