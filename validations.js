//Валидация полей
const Joi = require("joi")

//Валидация при регистрации
const regValidation = (data) => {
  const valid = Joi.object({
    email: Joi.string().min(6).required().email(),

    firstName: Joi.string().min(2).max(30).required(),

    lastName: Joi.string().min(2).max(30).required(),

    birthday: Joi.string().min(10).max(30).required(),

    password: Joi.string()
      .min(6)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    repassword: Joi.ref("password"),
  })
  return valid.validate(data)
}

const logValidation = (data) => {
  const valid = Joi.object({
    login: Joi.string().required().email(),

    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  })
  return valid.validate(data)
}

const chatCreatedValidation = (data) => {
  const valid = Joi.object({
    title: Joi.string().min(6).max(128).required(),
    opponent: Joi.string().required(),
  })
  return valid.validate(data)
}

const messageCreatedValidation = (data) => {
  const valid = Joi.object({
    message: Joi.string().min(1).max(255).required(),
  })
  return valid.validate(data)
}

module.exports.regValidation = regValidation
module.exports.logValidation = logValidation
module.exports.chatCreatedValidation = chatCreatedValidation
module.exports.messageCreatedValidation = messageCreatedValidation
