var mongoose = require ('mongoose');

var standardschema = new mongoose.Schema({
    std:{
        type:String
    }

})

module.exports = mongoose.model('standard',standardschema);