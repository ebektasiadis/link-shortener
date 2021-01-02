import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import bodyParser from "body-parser";

import users from "./api/users";
import links from "./api/links";
import { jwtStrategy } from "./strategies";

import Link from "./models/Link";

dotenv.config();
const app = express();
const port = 5000 || process.env.PORT;

passport.use(jwtStrategy);

mongoose.connect('mongodb://database:27017/linkshortener', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users);
app.use('/api/links', links);

app.get('/:id', async (req, res) => {
    console.log(`Someone visited ${req.params.id}. He/she came from ${req.header('referer')}.`);
    const link = await Link.findOne({shortLink: req.params.id});
    if(link) {
        return res.redirect(link.originalLink);
    }
    return res.json({success: false, message: 'invalid id'});
});

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server running at port ${port}`);
});