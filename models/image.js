const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  activities: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "activities"
   }
});

module.exports = mongoose.model('image', imageSchema);