const mongoose = require('mongoose');
const imageSchema = require("./image");
const locationSchema = require("./location")
const user = require('./user');

const Schema = mongoose.Schema;
const activitiesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    enum: ['parkour', 'calisthenics', 'hiking'],
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
  location: locationSchema,
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
