const express =  require("express");
const {Login,Register} = require("../services/userservice.js");
const router = express.Router();

router.post('/register',Register);
router.post('/login',Login);

module.exports = router;
