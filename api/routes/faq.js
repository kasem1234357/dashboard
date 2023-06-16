const router = require("express").Router();
const Faq = require('../models/Faqs')

// add Faq
router.post('/',async(req,res)=>{
 const faq = new Faq(req.body)
 try {
   const savedFaq = await faq.save()
   res.status(200).json(savedFaq)
 } catch (error) {
   res.status(500).json(error)
 }
})
// get all Faq
router.get('/',async(req,res)=>{
 try {
   const faqs = await Faq.find();
   res.status(200).json(faqs)
 } catch (error) {
  res.status(500).json(error)
 }
})





module.exports =router