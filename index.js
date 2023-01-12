const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongo = require('./database.js/database')
const register = require('./routes/user')
const login = require('./routes/login')

app.use(cors())
app.use(express.json())
app.use('/api/register', register)
app.use('/api/login', login)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})
