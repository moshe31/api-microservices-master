const mongoose = require('mongoose');

//Create Schema
const Schema = mongoose.Schema;

//Create Exercise schema
const ExercisesSchema = new Schema({
    description: {
        type: String,
        required: true,
        maxlength: [20, 'description too long']
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'duration too short']
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: String,
    userId: {
        type: String,
        ref: 'Users',
    }
});

//Check if userID exists, then add username.
// ExercisesSchema.pre('save', function(next){
//     mongoose.model('Users').findById(this.userId, (err, user) => {
//         if(err) return next(err)
// console.log(this.userId, user);
//         if(!user){
//             const err = new Error('unknown userId');
//             err.status = 400;
//             return next(err);
//         } else {
//             this.username = user.username;
//             if(!this.date){
//                 this.date = Date.now();
//             }
//         }
//         next();
//     })
// })

module.exports = mongoose.model('Exercises', ExercisesSchema);
