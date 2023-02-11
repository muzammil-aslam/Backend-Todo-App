const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img:{
    type:String,
    default:"https://i1.wp.com/pixahive.com/wp-content/uploads/2021/05/Stylish-boy-posing-on-the-street-438537-pixahive.jpg?fit=2048%2C2560&ssl=1",
  }
});

module.exports = mongoose.model("User", UserSchema);
