const express = require("express");
const mongoose = require('mongoose');   

const Data = require('./models/dummyNodeData');

const DB_URI = "mongodb+srv://Victorapple:torch@cluster0.7h8r7kr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URI)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.get('/', (req, res) => {
    res.send("Hello");
})

app.get('/data', async (req, res) => {
    const data = await Data.find({});
    res.send(data)
})

app.get('/data/:node', async (req, res) => {
    const data = await Data.find({pnode_name: req.params.node});
    res.send(data)
})


app.listen(3000, () => {
    console.log("Serving on port 3000")
});