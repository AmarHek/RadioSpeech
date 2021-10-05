import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path";

import * as materialRoutes from './routes/materialRoutes';
import * as templateRoutes from './routes/templateRoutes';

export const app = express();

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
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE');
  next();
});
console.log(path.join(__dirname, "../data/images"));
app.use(express.static(path.join(__dirname,"../data/images")));

app.use("/radio/database", materialRoutes.router);
app.use("/radio/database", templateRoutes.router);

//app.get("/*", (req,res)=> res.sendFile(path.join(__dirname)));
