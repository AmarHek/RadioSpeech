const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const materialRoutes = require('./routes/materialRoutes');
const templateRoutes = require('./routes/templateRoutes');


const app = express();

// TODO: Auf env auslagern
const url = "mongodb://127.0.0.1:27017/radio"

mongoose.connect(url,
    {useNewUrlParser: true,
            useUnifiedTopology: true
    })
  .then(() => {
    console.log("Connected to db");
  })
  .catch(() => {
    console.log("Connection lost");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set("view engine", "ejs");


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');


  next();
});

app.use("/radio/database", materialRoutes);
app.use("/radio/database", templateRoutes);

//app.get("/*", (req,res)=> res.sendFile(path.join(__dirname)));


module.exports = app;
