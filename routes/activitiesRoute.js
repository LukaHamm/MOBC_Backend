const express =  require("express");
const {GetAllActivities,GetActivityByUserId,PostActivity,UpdateActivity,DeleteActivityById,GetActivityById} = require("../services/activitiesservice");
const {verifyToken} = require("../Auth/auth");
const router = express.Router();

router.post('/',verifyToken,PostActivity);
router.delete('/:id',verifyToken,DeleteActivityById);
router.put('/:id',verifyToken,UpdateActivity);
router.get('/userId',verifyToken,GetActivityByUserId);
router.get('/:id',GetActivityById);
router.get('/',verifyToken,GetAllActivities);


module.exports = router;