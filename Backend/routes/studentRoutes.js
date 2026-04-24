const express = require("express");
const router= express.Router();
const Student = require("../models/student");
const { model } = require("mongoose");
const student = require("../models/student");

router.post("/", async (req,res)=>{
    try{
        const student = await Student.create(req.body);
        res.status(201).json(student);
    }catch(error){
        res.status(400).json({error:error.message})
    }
})
router.get("/",async (req,res)=>{
    try{
        const student = await Student.find();
        res.json(student);
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

router.get("/:id",async (req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            res.status(404).json({message:"Student not found"})
        }else{
        res.json(student);
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

//update

router.put('/:id', async(req,res)=>{
   try{
     const student  = await  Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    if(!student){
        res.status(404).json({message:"Student not found.."})
    }
    else{
    res.json(student);
    }
   }
   catch(err){
    res.status(500).json({err:err.message})
   }
});

//delete
router.delete("/:id", async (req,res) =>{
    try{
        const student =  await Student.findByIdAndDelete(req.params.id);

        if(!student){
            res.status(404).json({message:"Student not found"})
        }
        else{
             res.json({student,message:"student deleted successfully"});
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})

module.exports = router;
