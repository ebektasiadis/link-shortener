import express from "express";
import passport from "passport";
import { nanoid } from "nanoid";

import constants from "../constants";
import Link from "../models/Link";
import linkValidator from "../validators/link";

const router = express.Router();

//todo for dev purposes only.
router.get('/', async (req, res) => {
    const links = await Link.find().populate("owner");
    return res.json(links);
})

router.post('/', 
passport.authenticate('jwt', {session: false}),
linkValidator,
async (req, res) => {
    const link = new Link({
        owner: req.user._id,
        originalLink: req.body.link,
        shortLink: nanoid(constants.NANOID_LENGTH)
    });

    const saveResult = await link.save();
    return res.json(saveResult);
})

export default router;