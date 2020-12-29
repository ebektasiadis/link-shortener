import express from "express";
import bodyParser from "body-parser";

import users from "./api/users";

const app = express();
const port = 5000 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', users);

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server running at port ${port}`);
});