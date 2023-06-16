const router = require("express").Router();
const DashUser = require('../models/User')
const crypto = require("crypto");
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
router.put('/:id',async(req,res)=>{
  const password = req.body?.password
  try {
     const user = await DashUser.findById(req.params.id)
     
     if(password == undefined){
      await user.updateOne({$set:req.body})
     }
     else{
      const hashedPassword = hashPassword(req.body.password);
      const data = {...req.body,password:hashedPassword}
      await user.updateOne({$set:data})
     }
     res.status(200).json('updated')
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/:id',async(req,res)=>{
  try {
    const user = await DashUser.findById(req.params.id);
    const {password,...clientData} = user
    res.status(200).json(clientData)
  } catch (error) {
     console.log(error);
  }
})






module.exports =router