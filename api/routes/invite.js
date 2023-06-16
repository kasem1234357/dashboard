const router = require("express").Router();
const InviteCode = require('../models/InviteCode')

router.post("/",async(req,res)=>{
try {
 const newCode = new InviteCode({
  code:req.body.inviteCode,
  type:true
 })
 await newCode.save();
 console.log("done");
 res.status(200).json({msg:"activate"})
} catch (error) {
 res.status(500).json({msg:"not activate"})
}
})

module.exports =router