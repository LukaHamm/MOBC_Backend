const User = require("../models/user.js");
const emailValidator = require("../validators/emailValidator");
const jwt = require("jsonwebtoken");
require("dotenv").config();



class UserService {
    // register method
   static Register = async (req,res,next) => {
   const {name,lastname,username,password,email} = req.body;
    try {
       const user = await User.findOne({email:email});
       if(user) return res.status(500).json("This user already exist");
       if(!emailValidator(email)) return res.status(500).json("enter a valid email")
        const saveuser = await User.create({
         username,
         name,
         password,
         email,
         lastname
        });
        await saveuser.save(); 
      res.status(200).json("User created");
    } catch (error) {
        next(error)
    }
}
//login method
static Login = async (req,res,next) => {
try {
if(!req.body.email || !req.body.password) return next(ApiError.NotFound("please input values"))
const user = await User.findOne({email:req.body.email});
if(!user) return res.status(400).json("This user doesn’t exist");
const isMatch = await user.matchPassword(req.body.password);
if(!isMatch) return res.status(400).json("wrong password")
const token = jwt.sign({id:user._id,email:user.email},process.env.JWT);
const {password, ...otherDetails} = user._doc;
res.status(200).json({user:{...otherDetails,token}});
} catch (error) {
   next(error) 
 };
}

}

module.exports =  {Register,Login} = UserService;