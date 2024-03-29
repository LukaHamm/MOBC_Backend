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
    enum: ['all','parkour', 'calisthenics', 'outdoor','outdoor_gym'],
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true
  },
  location: locationSchema,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
   },
   evaluations: [{
    type: Schema.Types.ObjectId,
    ref: "evaluations"
   }],
   images: [{
    type: Schema.Types.ObjectId,
    ref: "image"
   }]

});

module.exports = mongoose.model('activities', activitiesSchema);
