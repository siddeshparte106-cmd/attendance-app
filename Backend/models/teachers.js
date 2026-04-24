const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String, required:true},
    phone_no:{type:String ,required:true}
});

module.exports = mongoose.model("Teacher",teacherSchema);