const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().required().min(5).max(10),
});

router.post("/", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email ");

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(404).send("Invalid password");

  let responseData = {};
  if (validpassword) {
    responseData.user = req.body.email;
    responseData.msg = "Logged in successfully";
  }

  res.status(200).send(responseData);
});

module.exports = router;
