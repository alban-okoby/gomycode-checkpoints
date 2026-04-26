const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  googleId: String
});

userSchema.pre("save", async function(next) {

  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
 });

userSchema.methods.correctPassword = async function(candidate, password){
  return await bcrypt.compare(candidate, password);
};

module.exports = mongoose.model("User", userSchema);
