const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messagesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
})

const chatsSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  messages: [messagesSchema],
  createdAt: {
    type: Date,
    required: false,
    default: Date,
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

module.exports = mongoose.model("Chats", chatsSchema)
