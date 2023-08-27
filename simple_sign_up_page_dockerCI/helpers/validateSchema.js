const Joi = require('@hapi/joi')

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
  isAdmin: Joi.boolean()
})

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
})

const postSchema = Joi.object({
    title: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().required(),
    categories: Joi.string().required(),
    image: Joi.string(),
    comment: Joi.array().items(Joi.string()),
    likes: Joi.array().items(Joi.string()),
  })

  const contactSchema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
    subject: Joi.string(),
    message: Joi.string().required(),
  })


module.exports = {
  signupSchema, authSchema, postSchema, contactSchema
}