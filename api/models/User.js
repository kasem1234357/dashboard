const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
 username: {
  type: String,
  require: true,
  min: 3,
  max: 20,
  unique: true,
},
email: {
  type: String,
  required: true,
  max: 50,
  unique: true,
},
phone:{
  type:Number,
},
password: {
  type: String,
  required: true,
  min: 6,
},
},{ timestamps: true })
module.exports = mongoose.model('DashUser',UserSchema)