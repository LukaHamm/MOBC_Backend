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
    static GetActivityByUserId = async (req,res,next) => {
   try {
   const activities = await Activities.find({user:req.user.id});
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
       await Activities.findByIdAndUpdate(req.params.id,{$set : req.body}) 
       res.status(200).json("post updated")
       } catch (error) {
      console.log(error);
   }
   }

   static DeleteActivityById = async (req,res,next) => {
    try {
    await Activities.findByIdAndDelete(req.params.id);
    res.status(200).json("post has been deleted");    
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

module.exports =  {GetAllActivities,GetActivityByUserId,PostActivity,UpdateActivity,DeleteActivityById,GetActivityById} = ActivitiesService;