const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    class_name:{type:String,required:true},
    section:{type:String, required:true},
    academic_year:{type:String, required:true}
});

module.exports = mongoose.model("Class",classSchema);