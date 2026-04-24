const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId,ref:"Student",required:true},
    class_id:{type:mongoose.Schema.Types.ObjectId,ref:"Class", required:true},
    subject_id:{type:mongoose.Schema.Types.ObjectId,ref:"Subject",required:true},
    date:{type:Date,required:true},
    status:{type:String,enum:["present","absent"],required:true},
    remark:{type:String,required:true},
    markedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Teacher", required:true},
},
{timestamps:true});
attendanceSchema.index(
  { student_id: 1, date: 1 },
  { unique: true }
);


module.exports = mongoose.model("Attendance",attendanceSchema)