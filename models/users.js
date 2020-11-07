const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  birthday: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Users", usersSchema)
