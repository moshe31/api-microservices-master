const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

//Import Models
const Users = require('../../models/users');
const Exercises = require('../../models/exercises');

//Body Parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


//@route   POST
//@desc    create a new user
//@access  public
router.post('/new-user', function(req, res, next) {
    const newUser = new Users({
        username: req.body.username
    })
    newUser.save()
           .then(user => res.json({_id: user._id, username: user.username}))
           .catch((err) => {
               if(err.code === 11000){
                   res.status(400).json({error: 'username already taken'})
               } else {
                    return next(err); 
               }
           });
});

//@route   POST
//@desc    add activity
//@access  public
router.post('/add', function(req, res, next) {
    //Find if userId exists
    Users.findById(req.body.userId, (err, user) => {
        if(err) return next(err);
        if(user === null){
            res.status(400).json({error: "unknown _id"});
        } else {
            const exercise = new Exercises(req.body);
            exercise.username = user.username;
            req.body.date === '' ?  exercise.date = Date.now() : exercise.date = req.body.date;

            exercise.save()
                    .then(savedExercise => res.json({
                      username: savedExercise.username,
                      description: savedExercise.description,
                      duration: savedExercise.duration,
                      userId: savedExercise.userId,
                      date: (new Date(savedExercise.date)).toDateString()  
                    }))
                    .catch((err) => {
                        res.status(400).json({error: "ValidationError, make sure to provide all the required fields"})  
                })
        }
    })
});

//@route   GET
//@desc    returns all registered users
//@access  public
router.get('/users', (req, res) => {
    Users.find((err, data) => {
        if(err){
            res.status(400).json({error: "Server Timeout"});
        }else{
         res.json(data);
        }
    })
  })

//@route   GET
//@desc    returns user exercise activity from db
//@access  public
router.get('/log', function(req, res) {
    //optional query params (Parsed)
    const from = new Date(req.query.from);
    const to = new Date (req.query.to);
    
    //check if user exists
    Users.findById(req.query.userId, (err, user) => {
        if(err || user === null){
            res.status(400).json({error: "unknown userId"});
        } else {
            Exercises.find({
                userId: req.query.userId,
                date: {
                    $gte: from != 'Invalid Date' ? from.getTime() : 0,
                    $lt: to != 'Invalid Date' ? to.getTime() : Date.now() 
                  }
            }, {
                __v: 0,
                _id: 0
            })
            .sort({date: -1})
            //optional
            .limit(parseInt(req.query.limit))
            .exec((err, exercises) => {
                if(err) return res.status(400).json({error: "Server Timeout"});
                
                const data = {
                    _id: req.query.userId,
                    username: user.username,
                    from: from != 'Invalid Date' ? from.toDateString() : undefined,
                    to: to != 'Invalid Date' ? to.toDateString() : undefined,
                    count: exercises.length,
                    log: exercises.map(x => ({
                       description: x.description,
                       duration: x.duration,
                       date: x.date.toDateString()
                    }))

                };

                res.json(data);
            })
        }
    })
});
 
module.exports = router;