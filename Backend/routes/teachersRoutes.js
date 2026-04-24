const express = require('express');
const router = express.Router();
const Teacher = require("../models/teachers");

router.post("/",async(req,res)=>{
    try{
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})

//get for all
router.get("/", async (req,res)=>{
    try{
        const teacher = await Teacher.find();
        res.json(teacher);
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

//get for specific teacher
router.get("/:id", async (req,res)=>{
    try{
        const teacher = await Teacher.findById(req.params.id);
        if(!teacher){
            res.status(404).json({message:"teacher not found"})
        }else{
            res.json(teacher)
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

//update
router.put("/:id", async (req,res)=>{
    try{
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!teacher){
            res.status(404).json({message:"Teacher not found"});
        }
        else{
            res.json(teacher);
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})


//delete
router.delete("/:id", async (req,res)=>{
    try{
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if(!teacher){
            res.status(404).json({message:"Teacher not found"});
        }else{
            res.json(teacher);
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})
module.exports = router;