const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const usersModel = require("../models/users")
const verify = require("../verifyToken")
const { regValidation, logValidation } = require("../validations")

//Регистрация нового пользователя
router.post("/register", async (req, res) => {
  //Валидация полей
  const { error } = regValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Проверка на уникальный email
  const emailExist = await usersModel.findOne({ email: req.body.email })
  if (emailExist)
    return res.status(400).json({ message: "Этот email уже занят" })

  //Создание нового пользователя
  const { repassword, ...restBody } = req.body
  //Хеширование пароля
  const salt = await bcrypt.genSalt(10)
  restBody.password = await bcrypt.hash(restBody.password, salt)
  const user = new usersModel(restBody)
  try {
    const savedUser = await user.save()
    res.status(201).json({ user: savedUser._id })
  } catch (err) {
    res.status(400).json({ err })
  }
})

//Аутентификация и авторизация пользователя
router.post("/auth", async (req, res) => {
  //Валидация полей
  const { error } = logValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Проверка на зарегистрированный email
  const user = await usersModel.findOne({ email: req.body.login })
  if (!user)
    return res
      .status(401)
      .json({ message: "Пользователь с таким email не найден!" })

  //Проверка пароля
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(401).json({ message: "Неверный пароль!" })

  //Создание и передача токена
  const { password, ...data } = user._doc
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SERCRET_KEY, {
    expiresIn: "2h",
  })
  res.header("auth-token", token).json({ token, user: user._id })
})

//Получение юзера по id
router.get("/:id", verify, async (req, res) => {
  //Сбор данных
  const userId = req.user._id

  //Поиск юзера
  const user = await usersModel.findById({ _id: userId }).lean()
  if (!user) return res.status(400).json({ message: "Пользователь не найден" })

  //Возвращаем id юзера
  res.status(200).json({ user })
})

// //Получение списка "друзей" TODO
router.get("/", verify, async (req, res) => {
  //Поиск юзеров
  const users = await usersModel.find({})

  if (!users)
    return res.status(400).json({ message: "Пользователи не найдены" })

  //Возвращаем юзеров
  res.status(200).json(users)
})

//Закрытие сессии
router.get("/logout", (req, res) => {
  //TODO
  res.status(500).json("TODO")
})

module.exports = router
