const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var User = new Schema({
  name:{type:String ,default:''},
  password:{type:String ,default:''},
  email:{type:String ,default:''},
  phone:{type:String ,default:''},
})


module.exports = mongoose.model('User',User)
