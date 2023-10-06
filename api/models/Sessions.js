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
userSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 });
module.exports = mongoose.model('Session',SessionSchema)