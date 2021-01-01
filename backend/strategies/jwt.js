import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import findConfig from 'find-config';

import User from '../models/User';

dotenv.config({path: findConfig('.env')});

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export default new JwtStrategy(options, async (payload, done) => {
    try{
        const user = await User.findById(payload.id);
        
        if(user)
            return done(null, user);
    }catch(e){
        console.log(e);
    }

    return done(null, false);
});