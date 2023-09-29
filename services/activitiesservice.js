const activities = require("../models/activities");
const Activities = require("../models/activities");
const Image = require("../models/image");
const fs = require('fs');

class ActivitiesService  {
    static GetAllActivities = async(req,res,next) => {
       try {
         if(req.query.category === 'all'){
            const activities = await Activities.find();
            res.status(200).json(activities);
         }else{
            const activities = await Activities.find({activityType:req.query.category});
            res.status(200).json(activities);
         }
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
       const {title,description,activityType,location,address} = req.body; 
       const uploadDate = new Date(Date.now());
       const user = req.user.id;
       console.log(user);
       const activities = await Activities.create({
            title,
            description,
            activityType,
            uploadDate,
            location,
            user,
            address

       });
       res.status(200).json(activities);
       } catch (error) {
       console.log(error);  
       }
   }


    static PostImageForActivity = async (req,res) => {
        if (!req.file) {
            return res.status(400).send('Es wurde keine Datei hochgeladen.');
        }
        const activities = req.params.id;
        const name = req.file.filename;
        const data = req.file.buffer;
        const img = await Image.create({
            name,
            data,
            activities
        })
        const activitiesobj = await Activities.findById(req.params.id);
        activitiesobj.images.push(img.id)
        const updateActivity = await Activities.findByIdAndUpdate(req.params.id,activitiesobj) 
        res.send(`Die Datei "${name}" wurde erfolgreich hochgeladen.`);
    }

    static GetImagesForActivity = async(req,res) => {
        console.log(req.params.id);
        const image = await Image.findById(req.params.id);
        res.setHeader('Content-type', 'image/jpeg');
        res.send(image.data);
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