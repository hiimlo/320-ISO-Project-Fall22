if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
    require('dotenv').config(); // Load .env
}
const express = require("express");
const mongoose = require('mongoose'); 
const path = require('path');
const DB_URI = process.env.DB_URI;
console.log(DB_URI)

//This code connects to our MongoDB through Mongoose, which lets us use Schemas to model data (Schemas make the data more structured)
mongoose.connect(DB_URI)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//This sets up the Express stuff
const app = express();

const cors = require('cors');
app.use(cors());
app.options('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});

const apiRoutes = require('./routes/api');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Home query page, not useful rn
app.get('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.render('index');
});

//API calls get redirected here
app.use('/', apiRoutes);

app.listen(6969, () => {
    console.log("Serving on port 6969")
});