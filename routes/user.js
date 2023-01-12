const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');



const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

})

router.post('/', async (req, res) => {
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let tester = await User.findOne({ email: req.body.email })
  if (tester) return res.status(400).send('User already registered')

  try {
    tester = await new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    const salt = await bcrypt.genSalt(10)
    tester.password = await bcrypt.hash(tester.password, salt)


    tester = await tester.save()
    res.send(tester)
  }

  catch (err) {
    res.send(err.message)
  }

})

module.exports = router