import express from "express";

import registerValidator from "../validators/register";
import loginValidator from "../validators/login";

const router = express.Router();

router.post('/', registerValidator, (req, res) => {
    
})

export default router;