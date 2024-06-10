const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref:"student"
    },
    sub1:{
        type:Number,
    }, 
    sub2:{
        type:Number,
    },
    sub3:{
        type:Number,
    },
    sub4:{
        type:Number,
    },
    sub5:{
        type:Number,
    },
    total:{
        type:Number,
    },
    percentage:{
        type:Number,
    },
    max:{
        type:Number
    },
    min:{
        type:Number
    }
})

module.exports = mongoose.model('result',resultSchema);