const express = require("express");
const router = express.Router();
const AttendanceTable = require('../models/attendanceTable');
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { date, class_id, subject_id, markedBy, students } = req.body;


    const records = students.map((s) => ({
      student_id: s.student_id,
      class_id,
      subject_id,
      date,
      status: s.status ? "present" : "absent",
      remark: s.remark || "N/A",
      markedBy,
    }));


    const result = await AttendanceTable.insertMany(records, {
      ordered: false,
    });

    res.status(201).json(result);

  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});


// all student presenty
router.get("/", async (req,res)=>{
    try{
        const attendance = await AttendanceTable.find();
        res.json(attendance);
    }catch(err){
        res.status(500).json({err:err.message})
    }
})


// for present
router.get("/present" , async (req,res)=>{
    try{
        const attendance = await AttendanceTable.find({ status:'present' });
        if(attendance.length === 0){
            return res.json({message:"no any present"})
        }else{
            res.status(201).json(attendance);
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

//for absent
router.get("/absent", async (req,res)=>{
    try{
        const attendace = await AttendanceTable.find({ status:'absent' });
        if(attendace.length === 0){
          return  res.json({message:"All student is present"});
        }else{
            res.json(attendace)
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})

// update
router.put('/:id', async (req,res)=>{
    try{
        const student = await AttendanceTable.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!student){
           return res.status(404).json({message:"Student is not found.."})
        }else{
            res.json(student)
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const newclass = await AttendanceTable.findByIdAndDelete(req.params.id)
        if(!newclass){
            res.status(404).json({message:"attendance record not exist"});
        }else{
            res.json(newclass)
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

module.exports = router;