const express = require("express");
const {
  GetAllActivities,
  GetActivityByOwnUserId,
  PostActivity,
  GetActivityByOtherUserID,
  UpdateActivity,
  DeleteActivityById,
  GetActivityById,
  PostImageForActivity
} = require("../services/activitiesservice");
const { verifyToken } = require("../Auth/auth");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const multer = require('multer'); 

router.post("/image:id", upload.single('image'), verifyToken, PostImageForActivity);
router.post("/", verifyToken, PostActivity);
router.delete("/:id", verifyToken, DeleteActivityById);
router.put("/:id", verifyToken, UpdateActivity);
router.get("/:userId/:id", GetActivityByOtherUserID); // Hier die Korrektur
router.get("/userId", verifyToken, GetActivityByOwnUserId);
router.get("/:id", GetActivityById);
router.get("/", GetAllActivities);

module.exports = router;
