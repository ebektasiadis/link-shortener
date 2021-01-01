import validator from "validator";

export default (req, res, next) => {
    const { email, password} = req.body;

    if(!email || !validator.isEmail(email)) {
        return res.status(400).json({success: false, message: 'invalid email'});
    }

    if(!password) {
        return res.status(400).json({success: false, message: 'invalid password'});
    }

    if(!validator.isLength(password, {min: 6, max: 12})) {
        return res.status(400).json({success: false, message: 'invalid password size'});
    }
    
    next();
}