const mongoose = require('mongoose');

//short ID generator
function generateID(){
    let id = "";
    const length = 9;
    const mix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    for(let i = 0; i < length; i++){
        id += mix.charAt(Math.floor(Math.random() * mix.length));
    }
    return id;
}

//Create schema
const Schema = mongoose.Schema;

//Create user schema
const UsersSchema = new Schema({
    _id: {
        type: String,
        default: generateID
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20, 'username too long']
    }
});

//User Model
module.exports = mongoose.model('Users', UsersSchema);