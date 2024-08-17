const router = require("express").Router();

const Employeer = require('../models/Employeer')
const crypto = require("crypto");
const Tasks = require("../models/Tasks");
const Product = require("../models/Product");
const User = require("../models/User");
const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");
const API = require("../classes/Api");
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
const updateEmployeer =asyncErrorHandler( async(req,res,next)=>{
  const api = new API(req,res)
    
    const password = req.body?.password
  
       const employeer = await Employeer.findById(req.params.id)
       
       if(password == undefined){
        await employeer.updateOne({$set:req.body})
       }
       else{
        const hashedPassword = hashPassword(req.body.password);
        const data = {...req.body,password:hashedPassword}
        await employeer.updateOne({$set:data})
       }
       api.dataHandler('update')
  })
const getAllEmployeer = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req,res)
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;
  
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const employeers = await Employeer.find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
  
      const total = await Employeer.countDocuments({
        name: { $regex: search, $options: "i" },
      });
      api.dataHandler('fetch',{
        employeers,
        total,
      })
  })
const getEmployeer = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req,res)
      const employeer = await Employeer.findById(req.params.id);
      // console.log(req.headers["cookie"].split(' '));
      // log(req.headers)
      // console.log(await DashUser.find());
      // console.log(req.params.id);
      if(employeer){
        // console.log("hi");
        const {password,...clientData} = employeer._doc
        const taskNumber = await Tasks.count()
        const productNumber = await Product.count()
        api.dataHandler('fetch',{...clientData,taskNumber,productNumber})
        
      }else{
         const error = api.errorHandler('not_found')
         next(error)
      }
     

  })
const removeEmployeer = asyncErrorHandler(async(req,res,next)=>{
   const api = new API(req,res)
      const employeer = await Employeer.findById(req.params.id);
      await employeer.deleteOne();
      api.dataHandler('delete')
      res.status(200).json("the employeer has been deleted ");
  })

module.exports = {removeEmployeer,getAllEmployeer,getEmployeer,updateEmployeer}