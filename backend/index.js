import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

require('dotenv').config();

import users from "./api/users";

const app = express();
const port = 5000 || process.env.PORT;

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