const mongoose = require('mongoose')
const SessionSchema =new mongoose.Schema({
 sessionID:{
  type:String,
  required: true,
  unique: true,
 },
 userName:{
    type:String,
    required: true,
    unique: true,
 },
 
})
SessionSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 * 24 * 7 });
module.exports = mongoose.model('Session',SessionSchema)