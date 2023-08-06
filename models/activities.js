const mongoose = require('mongoose');
const imageSchema = require("./image");
const user = require('./user');

const Schema = mongoose.Schema;
const activitiesSchema = new Schema({
  titel: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    required: true,
  },
  images: [imageSchema],
  uploadDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
   },
   evaluations: [{
    type: Schema.Types.ObjectId,
    ref: "evaluations"
   }]

});

module.exports = mongoose.model('activities', activitiesSchema);
