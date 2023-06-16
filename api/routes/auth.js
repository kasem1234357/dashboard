const router = require("express").Router();
const User = require("../models/User");
const InviteCode = require("../models/InviteCode")
const passport = require('passport');
const crypto = require("crypto");
// const isAuth = require('./authMiddleware').isAuth;
// const isAdmin = require('./authMiddleware').isAdmin;
/*============================================================*/
function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}
function comparePasswords(plainPassword, hashedPassword) {
  const hash = crypto.createHash('sha256');
  hash.update(plainPassword);
  const hashedPlainPassword = hash.digest('hex');
  return hashedPlainPassword === hashedPassword;
}
/*================================================================ */
router.post("/register", async (req, res) => {
   const hashedPassword = hashPassword(req.body.password);
   
   const checkEmail = await User.findOne({ email: req.body.email });
   const checkName = await User.findOne({username:req.body.userName});
   const inviteState = await InviteCode.findOne({code :req.body.inviteCode}) 
   const isInvite = (inviteState && inviteState.state === true)
 try {
   //generate new password
   if(checkEmail ){
    res.status(401).json("email is taken")
   }
   else if(checkName){
    console.log(req.body.userName);
    res.status(401).json("name is taken")
   }
   else if(!isInvite){
    res.status(403).json({msg:"you are not invited"})
   }

   else{
     
    const newUser = new User({
      username: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
   }
  //  console.log(checkEmail)
   //create new user
   
 } catch (err) {
   
   res.status(500).json("err"+err)
 }
});

//LOGIN
 router.post("/login", async (req, res) => {
  
 
 try {
  const user = await User.findOne({ email: req.body.email });
  let validPassword = ""
  if(user){
    validPassword = comparePasswords(req.body.password, user.password)
  }
  console.log(!user)
  console.log(validPassword)
  if(!user){ res.status(404).json("user not found");}
  else if(!validPassword || undefined){
  res.status(401).json("wrong password")
  }
  else{
    res.status(200).json(user)
  }
   
 } catch (err) {
  
   res.status(404).send('no user exists in db to update')
 }
});

module.exports = router;
