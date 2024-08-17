const API = require('../classes/Api');
const Faq = require('../models/Faqs');
const asyncErrorHandler = require('../wrapper_functions/asyncErrorHandler');
const createFaq =asyncErrorHandler(async(req,res)=>{
    const faq = new Faq(req.body)
const api = new API(req,res)
      await faq.save()
      api.dataHandler('create')
   })
const getFaq = asyncErrorHandler(async(req,res)=>{
  const api = new API(req,res)
      const faqs = await Faq.find();
      api.dataHandler('fetch',faqs)
   })
const getSingleFaq = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req,res)
     const faq = await Faq.findById(req.params.id)
     if(faq){
      api.dataHandler('fetch',faq)

     }else{
      const error = api.errorHandler('not_found')
      next(error)
     }

})

   module.exports = {
    createFaq,getFaq,getSingleFaq
   }