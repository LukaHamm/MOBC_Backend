const Evaluations = require("../models/evaluations");
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
       const user = req.user.id;
       const username = req.user.name;
       const evaluations = await Evaluations.create({
            text,
            rating,
            uploadDate,
            activities,
            user
       });
       res.status(200).json(evaluations);
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