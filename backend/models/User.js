import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email field is required."],
        unique: [true, "Account already exists."],
        minLength: [6, "Password length is invalid."],
        maxLength: [18, "Password length is invalid."]
    },
    password: {
        type: String,

        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

const User = new mongoose.model('User', userSchema);
export default User;