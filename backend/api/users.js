import express from "express";
import bcrypt from "bcrypt";

import registerValidator from "../validators/register";
import loginValidator from "../validators/login";

import User from "../models/User";

const router = express.Router();

router.post('/', registerValidator, async (req, res) => {
    const saltedPassword = await bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    
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

router.get('/', loginValidator, (req, res) => {

})

export default router;