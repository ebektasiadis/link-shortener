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
        await newUser.save();
        res.send('Done');
    }catch(e){
        console.log(e);
        res.status(500).send('Error');
    }
})

router.get('/', loginValidator, (req, res) => {

})

export default router;