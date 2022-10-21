if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV == null) {
    require('dotenv').config(); // Load .env
}
const express = require("express");
const mongoose = require('mongoose');   
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const apiRoutes = require('./routes/api');

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log("Serving on port 3000")
});