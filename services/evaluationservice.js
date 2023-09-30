const Evaluations = require("../models/evaluations");
const User = require("../models/user.js");
class EvaluationsService  {
    
   static GetEvaluationsByActivityId = async (req,res,next) => {
        try {
            const evaluations = await Evaluations.find({activities:req.params.id});
            res.status(200).json(evaluations);
        } catch (error) {
            console.log(error);
        }
   }


   static PostEvaluation = async (req,res,next) => {
       try {
       const {text,rating} = req.body; 
       const uploadDate = new Date(Date.now());
       const activities = req.params.id;
       const usermodel = await User.find({email:req.user.email});
       console.log("User" + usermodel)
       if(!usermodel){
       const username = usermodel.username;
       console.log(username)
       const user = await usermodel._id;
       const evaluations = await Evaluations.create({
            text,
            rating,
            uploadDate,
            activities,
            user,
            username
       });
       res.status(200).json(evaluations);
    }
       } catch (error) {
       console.log(error);  
       }
   }

   static UpdateEvaluation = async (req,res,next) => {
   try {
       const updateEvaluation = await Evaluations.findOneAndUpdate({_id:req.params.id, user:req.user.id},{$set : req.body})
       if(updateEvaluation){
       res.status(200).json("post updated");
       }else{
        res.status(400).json("evaluation not found or no authorization to update");
       }
       } catch (error) {
      console.log(error);
   }
   }

   static DeleteEvaluaionById = async (req,res,next) => {
    try {
    const deleteEvaluation = await Evaluations.findOneAndDelete({_id:req.params.id, user:req.user.id});
    if(!deleteEvaluation){
        res.status(400).json("could not find user with id");
    }else{
        res.status(200).json("post has been deleted");    
    }
    } catch (error) {
    console.log(error);
    }
}

}

module.exports =  {GetEvaluationsByActivityId,PostEvaluation, UpdateEvaluation,DeleteEvaluaionById} = EvaluationsService;