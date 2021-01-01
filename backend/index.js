import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

import users from "./api/users";
import { jwtStrategy } from "./strategies";

dotenv.config();
const app = express();
const port = 5000 || process.env.PORT;

passport.use(jwtStrategy);

mongoose.connect('mongodb://database:27017/linkshortener', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users);

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server running at port ${port}`);
});