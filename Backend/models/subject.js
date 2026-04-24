const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject_name:{type:String, required:true},
    class_id:{type:mongoose.Schema.Types.ObjectId,ref:"Class"}
},
{timestamps:true});

module.exports = mongoose.model("Subject",subjectSchema);