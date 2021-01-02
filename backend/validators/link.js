import validator from "validator";

export default (req, res, next) => {
    const { link } = req.body;

    if(!link || !validator.isURL(link)) {
        return res.status(400).json({success: false, message: 'invalid link'});
    }

    next();
}