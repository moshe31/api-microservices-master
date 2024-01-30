const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//Time Stamp
const timeStamp = require('./routes/api/timestamp');

//Request Header Parser
const headerParser = require('./routes/api/header-parser');

//Url Shortener
const urlShortner = require('./routes/api/url-shortner');

//Exercise-tracker
const exerciseTracker = require('./routes/api/exercise-tracker');

//File-metadata
const fileMetaData = require('./routes/api/file-metadata');

//Cors
app.use(cors({optionsSuccessStatus: 200}));

//Static assets
app.use(express.static('public'));

//Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//Exercise Tracker: Connect to db
mongoose.connect(process.env.MONGO_URI || 'mongodb://root:root123@ds153853.mlab.com:53853/exercise-tracker', {useNewUrlParser: true})
        .then(() => console.log('DB connection successfull'))
        .catch((err) => console.log(err));


//Routes

//Time Stamp
app.use('/api/timestamp', timeStamp);

//Request Header Parser
app.use('/api/whoami', headerParser);

//Url-shortener
app.use('/api/shorturl', urlShortner);

//Exercise-Tracker
app.use('/api/exercise', exerciseTracker);

//File-metadata
app.use('/api/fileanalyse', fileMetaData);

//listener
var listener = app.listen(process.env.PORT || 5000, () => {
    console.log(`App is now listening on ${listener.address().port}`);
})