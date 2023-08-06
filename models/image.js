const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer 
});

module.exports=imageSchema;