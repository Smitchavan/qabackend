const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongo = require("./database.js/database");
const register = require("./routes/user");
const login = require("./routes/login");
const forgotPassword = require("./routes/forgotPassword");
app.use(cors());
app.use(express.json());
app.use("/api/register", register);
app.use("/api/forgotPassword", forgotPassword);
app.use("/api/login", login);

const port = 5000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
