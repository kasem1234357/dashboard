const mongoose = require('mongoose')
const InviteSchema =new mongoose.Schema({
 code:{
  type:String,
  required: true,
 },
 state:{
  type:Boolean,
  default:true,
  required: true,
 },
 
}, {
    timestamps: true,
    expires: 60 * 60 * 24 // expire after 24 hours
  })

module.exports = mongoose.model('InviteCode',InviteSchema)