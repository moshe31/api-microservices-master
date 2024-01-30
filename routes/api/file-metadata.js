const express = require('express');
const multer = require('multer');
const router = express.Router();

//Create memory storage
var storage = multer.memoryStorage();
var upload = multer({ storage: storage});

//@route   POST
//@desc    Analyze the uploaded file then returns JSON
//@access  Public
router.post('/', upload.single('upfile'), function(req, res){
    if(req.file) {
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        });
    } else {
        res.status(400).json({error: 'Something went wrong'});
    }
});

module.exports = router;