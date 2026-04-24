const express = require('express');
const router = express.Router();
const Class = require('../models/class');

router.post("/", async (req, res) => {
  try {
    const class_ = await Class.create(req.body);
    res.status(201).json(class_);
  } catch (err) {
    res.status(400).json({ error: err.message }); 
    console.log("something went wrong in Class table: " + err);
  }
});

// get all class
router.get("/", async (req,res)=>{
    try{
        const newClass = await Class.find();
        res.json(newClass);
    }catch(err){
        res.status(500).json({err:err.message});
    }
});

// get for one class
router.get("/:id", async (req,res)=>{
    try{
        const newClass = await Class.findById(req.params.id);
        if(!newClass){
            res.status(404).json({message:"Class not found"});
        }else{
        res.json(newClass)
        }
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})

//update
router.put("/:id", async(req,res)=>{
    try{
        const newClass = await Class.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!newClass){
            res.status(404).json({message:"Class is not exist.."})
        }else{
            res.json(newClass);
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const newclass = await Class.findByIdAndDelete(req.params.id)
        if(!newclass){
            res.status(404).json({message:"Class not exist"});
        }else{
            res.json(newclass)
        }
    }catch(err){
        res.status(500).json({err:err.message});
    }
})

module.exports = router;