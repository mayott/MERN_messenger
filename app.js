const createError = require("http-errors")
const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()

const chatsRouter = require("./routes/chats")
const usersRouter = require("./routes/users")

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(cors())

//Роуты
app.use("/api/chats", chatsRouter)
app.use("/api/users", usersRouter)

//Обработчик ошибок
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  //Рендер ошибки
  res.status(err.status || 500).json(err.message)
})

async function start() {
  try {
    mongoose.connect(
      process.env.DB_CLUSTER_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected on DB!")
      }
    )
  } catch (err) {
    console.log(err)
    return false
  }
}

start()

module.exports = app
