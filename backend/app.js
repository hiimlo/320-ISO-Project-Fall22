if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
    require('dotenv').config() // Load .env
}
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors') //API Call permissions
const DB_URI = process.env.DB_URI

//This code connects to our MongoDB through Mongoose, which lets us use Schemas to model data (Schemas make the data more structured)
mongoose.connect(DB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

//This sets up the Express stuff
const app = express()
const apiRoutes = require('./api')

//add cors for API call permissions
app.use(cors())
var whitelist = ['http://localhost:3069', 'http://localhost:3000', 'http://192.168.50.141:3069', 'localhost:']
var corsOptions = {
    origin: function (origin, callback) {
        /*
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
    */
        callback(null, true)
    }
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Home query page, not useful rn
//some cors options stuff here too
app.get('/', cors(corsOptions), function (req, res, next) {
    res.render('index')
})

//API calls get redirected here
app.use('/', apiRoutes)

app.listen(3000, () => {
    console.log('Serving API endpoint on port 3000')
})
