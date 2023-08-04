const express =  require("express");
const {CreatePost,DeletePostById,UpdatePost,GetPostById,GetPostByUserId} = require("../services/postservice");
const {verifyToken} = require("../Auth/auth");
const router = express.Router();

router.post('/',verifyToken,CreatePost);
router.delete('/:id',verifyToken,DeletePostById);
router.put('/:id',verifyToken,UpdatePost);
router.get('/:id',GetPostById);
router.get('/userId',GetPostByUserId);


module.exports = router;