import passport from "passport";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import constants from "../constants";

import registerValidator from "../validators/register";
import loginValidator from "../validators/login";

import User from "../models/User";

const router = express.Router();

router.post('/register', registerValidator, async (req, res) => {
    const saltedPassword = await bcrypt.hashSync(req.body.password, constants.BCRYPT_SALT_ROUNDS);
    
    const newUser = new User({
        email: req.body.email,
        password: saltedPassword,
        dateCreated: new Date()
    });

    try{
        let saveResult = await newUser.save();
        return res.json(saveResult);
    }catch(e){
        if(e.code == '11000'){
            return res.status(400).json({success:false, message: 'account already exists'});
        }
    }
})

router.post('/login', loginValidator, async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(await bcrypt.compare(req.body.password, user.password)){
            //Password is correct
            const payload = { 
                id: user._id,
                email: user.email 
            };
            const userJwt = jwt.sign(payload, process.env.JWT_SECRET);
            return res.json({success:true, jwtToken: userJwt});
        }
    }
    return res.status(400).json({success:false, message: 'wrong credentials'});
})

export default router;