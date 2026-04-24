const express = require("express");
const router = express.Router();
const Subject = require('../models/subject');
const { route } = require("./studentRoutes");
const subject = require("../models/subject");

router.post("/", async (req,res)=>{
    try{
        const subject = await Subject.create(req.body);
        res.status(201).json(subject);
    }
    catch(error){
        res.status(400).json({error:error.message})
        console.log("something went wrong in subject:"+ err)
    }
})

// get all subject
router.get("/", async (req,res)=>{
    try{
        const subject = await Subject.find();
        res.json(subject);
    }catch(err){
        res.status(404).json({err:err.message});
    }
});

//get specific subject
 router.get("/:id", async (req,res)=>{
    try{
        const subject =  await Subject.findById(req.params.id);
        if(!subject){
            res.status(404).json({message:"Subject not found.."})
        }else{
            res.json(subject);
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
 })



 //update
router.put("/:id", async (req,res)=>{
    try{
        const subject = await Subject.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!subject){
            res.status(404).json({message:"Subject not exist"})
        }else{
            res.json(subject)
        }
    }catch(err){
        res.status(500).json({err:err.message})
    }
});

//delete
router.delete("/:id", async (req,res)=>{
    try{
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if(!subject){
            res.status(404).json({message:"subject not exist"})
        }else{
            res.json(subject)
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})
module.exports = router;