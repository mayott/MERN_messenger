const express = require("express")
const router = express.Router()
const io = require("../bin/www")

const chatsModel = require("../models/chats")
const verify = require("../verifyToken")

const {
  chatCreatedValidation,
  messageCreatedValidation,
} = require("../validations")

//Создание чата
router.post("/createChat", verify, async (req, res) => {
  //Валидация полей
  const { error } = chatCreatedValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Сбор данных
  const { _id } = req.user
  const { title, opponent } = req.body

  //Создание нового чата
  const chatModel = new chatsModel({
    user1: _id,
    user2: opponent,
    title,
    messages: [],
  })
  try {
    const newChat = await chatModel.save()
    res.status(201).json({ newChat })
  } catch (err) {
    res.status(400).json({ message: "Не удалось создать новый чат" })
  }
})

//Поиск чата по id
router.get("/:id", verify, async (req, res) => {
  //Сбор данных
  const userId = req.user._id
  const chatId = req.params.id

  //Поиск чата
  const chat = await chatsModel
    .findById({ _id: chatId })
    .where("user")
    .equals(userId)
    .lean()
  if (!chat) return res.status(400).json({ message: "Чат не найден" })

  //Возвращаем id чата
  res.status(200).json({ id: chat._id })
})

//Список чатов пользователся
router.get("/", verify, async (req, res) => {
  //Сбор данных
  const { _id } = req.user

  //Поиск чатов
  const chats = await chatsModel
    .find({ $or: [{ user1: _id }, { user2: _id }] })
    .lean()
  if (!chats) return res.status(400).json({ message: "Нет ни одного чата" })

  //Возвращаем список чатов
  res.status(200).json(chats)
})

//Изменение title чата
router.patch("/:id", verify, async (req, res) => {
  //Сбор данных
  const chatId = req.params.id
  const newTitle = req.body.title
  const userId = req.user._id

  //Поиск чата
  const chat = await chatsModel.findOneAndUpdate(
    { _id: chatId, $or: [{ user1: userId }, { user2: userId }] },
    { $set: { title: newTitle } }
  )

  if (!chat) return res.status(400).json({ message: "Чат не найден" })

  //Возвращаем id чата
  res.status(200).json({ id: chat._id })
})

//Удаление чата
router.delete("/:id", verify, async (req, res) => {
  //Сбор данных
  const userId = req.user._id
  const id = req.params.id

  //Поиск и удаление чата
  const chat = await chatsModel.findOneAndRemove({
    _id: id,
    $or: [{ user1: userId }, { user2: userId }],
  })

  if (!chat)
    return res.status(400).json({ message: "Не удалось найти и удалить чат" })

  //Возвращаем id удаленного чата
  res.status(200).json({ id: chat._id })
})

//Создание сообщения в чате
router.post("/createMessage/:id", verify, async (req, res) => {
  //Валидация полей
  const { error } = messageCreatedValidation(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  //Сбор данных
  const chatId = req.params.id
  const { message } = req.body
  const userId = req.user._id

  //Поиск чата
  const chat = await chatsModel.findOne({
    _id: chatId,
    $or: [{ user1: userId }, { user2: userId }],
  })

  if (!chat) return res.status(400).json({ message: "Чат не найден" })
  try {
    chat.messages.push({ user: userId, text: message })
    const newChat = await chat.save()
    //Передаем id добавленного сообщения
    const lastMessageCount = Object.keys(newChat.messages).length - 1
    res.json({ message: newChat.messages[lastMessageCount] })
  } catch {
    res.status(400).json({ error: "Не удалось добавить сообщение" })
  }
})

//Вывод всех сообщений чата
router.get("/getChatMessages/:id", verify, async (req, res) => {
  //Сбор данных
  const userId = req.user._id
  const chatId = req.params.id

  //Поиск чата
  const chat = await chatsModel.findOne({
    _id: chatId,
    $or: [{ user1: userId }, { user2: userId }],
  })

  if (!chat) return res.status(400).json({ message: "Чат не найден" })

  //Возвращаем все сообщения чата
  res.status(200).json({ messages: chat.messages })
})

module.exports = router
