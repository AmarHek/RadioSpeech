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
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin)
            return callback(null, true);
        if(!allowedOrigins.includes(origin)){
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "../data/images")));
app.use(express.static(path.join(__dirname, "../dist/radiospeech/")));

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
