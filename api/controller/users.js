
const DashUser = require('../models/User')
const crypto = require("crypto");
const Tasks = require("../models/Tasks");
const hashPassword = require('../utils/hashPassword')
const Product = require("../models/Product");
const User = require("../models/User");
const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");
const API = require('../classes/Api');
const { signToken } = require('../utils');
const Token = require('../models/Token');
const getUser = asyncErrorHandler(async(req,res,next)=>{
      
      const api = new API(req, res);
      //api.logRequest()
      const user = await DashUser.findById(req.user._id);
      if(user){
        const {password,...clientData} = user._doc
        const taskNumber = await Tasks.count()
        const productNumber = await Product.count()
         // generate access token
    const accessToken = signToken(user._id);
    // generate refresh token
    const refreshToken = signToken(user._id, "refresh");
    // check if previous refresh token still found and deleted
    await Token.findOneAndDelete({userId:user._id})
  
    // store new refresh token in database
    await Token.create({token:refreshToken,userId:user._id})
    api.setCookie({ refreshToken }, {
      httpOnly: false,
      secure: false, // Set to true in production
      sameSite: 'lax', // Adjust based on your needs
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
 
  
        api.dataHandler('fetch',{...clientData,taskNumber,productNumber,accessToken})
      }else{
        const error = api.errorHandler('not_found')
        next(error)
      }
     
    
  })
const updateUser = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req, res);
    const password = req.body?.password
       const user = await DashUser.findById(req.params.id)
       if(password == undefined){
        await user.updateOne({$set:req.body})
       }
       else{
        const hashedPassword = hashPassword(req.body.password);
        const data = {...req.body,password:hashedPassword}
        await user.updateOne({$set:data})
       }
       api.dataHandler('update',null,'updated user informations')
  })
const getAllUser = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req, res);
  api.modify(User.find()).filter().sort().limitFields().paginate()
  const users = await api.query
  const total = await User.countDocuments()
      api.dataHandler('fetch',{
        users,
        total,
      })
  })
const deleteUser = asyncErrorHandler(async(req,res,next)=>{
  const api = new API(req, res);
      const user = await User.findById(req.params.id);
      await user.deleteOne();
      api.dataHandler('delete',"the user has been deleted ")
  })
  module.exports = {
    getAllUser,getUser,updateUser,deleteUser
  }