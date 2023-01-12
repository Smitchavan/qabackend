const mongoose = require('mongoose')
const mongo = mongoose.connect('mongodb://localhost:27017/qa')
.then(() => {
 console.log(`Database connected`)
})
.catch(err => 
    console.log(err.message))

    module.exports = mongo