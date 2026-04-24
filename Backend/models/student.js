const mongoose= require('mongoose');

const studentschema = new mongoose.Schema({
    roll_number:{ type:String, required:true, unique:true},
    first_name:{ type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    phone_no:{type:String},
    dob:{type:Date},
    gender:{type:String, enum:["male","female","other"]},
    address:{type:String,required:true},
    class_id:{type:mongoose.Schema.Types.ObjectId, ref:"Class"}
},
{timestamps:true}
);

module.exports = mongoose.model("Student",studentschema);