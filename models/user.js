const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type:String,
    required:true
 },
 activities: [{
  type: Schema.Types.ObjectId,
  ref: "activities"
 }]
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
};

module.exports = mongoose.model('user', UserSchema);