const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config



const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30    
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
      type:String,
    required: true,
    minlength: 8,
    maxlength: 1024    
    }
})

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id}, process.env.jwtPrivateKey,{expiresIn: '300s'})
  return token

} 

const User = mongoose.model('tester', userSchema)

 module.exports = User



