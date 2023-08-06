const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
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
  activities: {
    type: Schema.Types.ObjectId,
    ref: "activities"
   }

});
module.exports = mongoose.model('evaluations', evaluationSchema);