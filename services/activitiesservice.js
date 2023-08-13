const Activities = require("../models/activities");
class ActivitiesService  {
    static GetAllActivities = async(req,res,next) => {
       try {
         const activities = await Activities.find();
        res.status(200).json(activities);
       } catch (error) {
         console.log(error);
           
       } 
   };
    static GetActivityByOwnUserId = async (req,res,next) => {
   try {
    console.log("User_Obj: " + JSON.stringify(req.user));
    console.log("User ID " + req.user.id);
   const activities = await Activities.find({user:req.user.id});
   res.status(200).json(activities);
   } catch (error) {
   console.log(error);  
   }
   }

   static GetActivityByOtherUserID = async (req,res,next) => {
        try {
            const activities = await Activities.find({user:req.params.id});
            res.status(200).json(activities);
        } catch (error) {
            console.log(error);
        }
   }


   static PostActivity = async (req,res,next) => {
       try {
       const {title,description,activityType,images,location} = req.body; 
       const uploadDate = new Date(Date.now());
       const user = req.user.id;
       console.log(user);
       const activities = await Activities.create({
            title,
            description,
            activityType,
            images,
            uploadDate,
            location,
            user

       });
       res.status(200).json(activities);
       } catch (error) {
       console.log(error);  
       }
   }

   static UpdateActivity = async (req,res,next) => {
   try {
       const updateActivity = await Activities.findByIdAndUpdate(req.params.id,{$set : req.body}) 
       if(updateActivity){
       res.status(200).json("activity updated")
       }else{
        res.status(400).json("activity not found or no authorization to update")
       }
       } catch (error) {
      console.log(error);
   }
   }

   static DeleteActivityById = async (req,res,next) => {
    try {
    const deleteActivity = await Activities.findOneAndDelete({_id:req.params.id, user:req.user.id});
    if(deleteActivity){
        res.status(200).json("activity has been deleted");    
    }else{
        res.status(400).json("activity not found or no authorization to delete");    
    }
    } catch (error) {
    console.log(error);
    }
}

static GetActivityById = async (req,res,next) => {
    try {
    const activities = await Activities.findById(req.params.id);
    res.status(200).json(activities);
    } catch (error) {
    console.log(error);  
    }
}

}

module.exports =  {GetAllActivities,GetActivityByOwnUserId: GetActivityByUserId,PostActivity,UpdateActivity,DeleteActivityById,GetActivityById} = ActivitiesService;