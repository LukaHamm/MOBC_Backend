const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const evaluationSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  
  rating:{
    type: Number,
    validate: {
        validator: Number.isInteger,
        max:5,
        message: '{VALUE} is not an integer value'
      },
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
  },
  activities: {
    type: Schema.Types.ObjectId,
    ref: "activities"
   },
   user: {
    type: Schema.Types.ObjectId,
    ref: "user"
   },
   username: {
    type: String,
    ref: "user"
   }


});
module.exports = mongoose.model('evaluations', evaluationSchema);