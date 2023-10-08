const router = require("express").Router();
const Tasks = require('../models/Tasks');
const { isAuth } = require("./authMiddleware");

// get all tasks
router.get('/', async(req,res)=>{
 try {
     const allTasks = await Tasks.find()
     res.status(200).json(allTasks)
 } catch (error) {
   res.status(500).json(error)
 }
})
// get single tasks 
router.get('/:id',async(req,res)=>{
 try {
     const task = await Tasks.findById(req.params.id)
     res.status(200).json(task)
 } catch (error) {
  res.status(500).json(error)
 }
})

// add task
router.post('/', async(req,res)=>{
 const newTask = new Tasks(req.body)
 try {
  const savedTask = await newTask.save()
  res.status(200).json(savedTask)
 } catch (error) {
  res.status(500).json(error)
 }
})

// delete task 
router.delete('/:id',async(req,res)=>{
   try {
    await Tasks.findByIdAndDelete(req.params.id)
    res.status(200).json('the task has been deleted')
   } catch (error) {
     res.status(500).json(error)
   }
})
// update tasks 
router.put('/update/:id',async(req,res)=>{
 try {
   const task = await Tasks.findById(req.params.id)
   await task.updateOne({$set:req.body})
   res.status(200).json('task haS been updated')
 } catch (error) {
  res.status(500).json(error)
  
 }
})
//
router.get('/calendar/tasks',async(req,res)=>{
  try {
    const tasks = await Tasks.find({remainder:true})
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json(error)
  }
})






module.exports =router