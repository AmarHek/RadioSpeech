import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path";
import cors from "cors";


import * as materialRoutes from './routes/material.routes';
import * as templateRoutes from './routes/template.routes';

export const app = express();

// TODO: Auf env auslagern
const url = "mongodb://127.0.0.1:27017/radio"

mongoose.connect(url,
    {useNewUrlParser: true,
            useUnifiedTopology: true
    })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

const corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
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
