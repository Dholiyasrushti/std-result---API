var mongoose = require('mongoose');

var staffschema = new mongoose.Schema({
    staff_name:{
        type:String
    },
    staff_username:{
        type:String
    },
    staff_pass:{
        type:String
    },
    staff_contact:{
        type:String
    }
});
module.exports = mongoose.model("staff",staffschema); 
