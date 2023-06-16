const router = require("express").Router();
const nodemailer = require('nodemailer');

router.post('/',async(req,res)=>{
 const {title,text,type} = req.body

  console.log(title,text,type);
  res.status(200).json("done")
})
module.exports = router