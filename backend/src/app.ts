import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from "path";
import * as C from "./config/db.config";
import cors from "cors";

import * as materialRoutes from './routes/material.routes';
import * as templateRoutes from './routes/template.routes';
import * as authRoutes from "./routes/auth.routes";
import * as userRoutes from "./routes/user.routes"
import { allowedOrigins } from "./config/cors.config";

export const app = express();

// TODO: Auf env auslagern

const url = "mongodb://" + C.dbConfig.HOST + ":" + C.dbConfig.PORT + "/" + C.dbConfig.DB;
mongoose.connect(url,
    {useNewUrlParser: true,
            useUnifiedTopology: true
    })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });


app.use(cors({
    origin: "*"
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/images", express.static(path.join(__dirname, "../data/images")));
app.use("/dist", express.static(path.join(__dirname, "../dist/radiospeech/")));
console.log(path.join(__dirname, "../dist/radiospeech/"));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/radiospeech/index.html"));
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE');
    next();
});

app.use("/radio/database", materialRoutes.router);
app.use("/radio/database", templateRoutes.router);
app.use("/radio/authentication/this/is/very/safe/133742069", authRoutes.router);
app.use("/radio/test", userRoutes.router);
