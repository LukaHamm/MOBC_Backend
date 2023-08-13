const express = require("express");
const {
    GetEvaluationsByActivityId,
    PostEvaluation,
    UpdateEvaluation,
    DeleteEvaluaionById
} = require("../services/evaluationservice");
const { verifyToken } = require("../Auth/auth");
const router = express.Router();

router.post("/activity/:id", verifyToken, PostEvaluation);
router.delete("/:id", verifyToken, DeleteEvaluaionById);
router.put("/:id", verifyToken, UpdateEvaluation);
router.get("/activity/:id", GetEvaluationsByActivityId);

module.exports = router;