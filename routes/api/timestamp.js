const express = require('express');
const router = express.Router();

//@route  GET api/timestamp
//@desc   Return UTC Time Stamp
//@access Public
router.get('/:word?', (req, res) => {
    var iso_8601 = /^((\d{4})\-(((0)([0-9]{1}))|((1)([0-2]{1})))\-(((0|1|2)([0-9]{1}))|((3)([0-1]{1}))))|(?!\d+\-)(\d{10,})/gmi;
    if(req.params.word) {
       if(iso_8601.test(req.params.word)){
          var date = new Date(dateOrSec(req.params.word));
          
          date.toUTCString() !== 'Invalid Date' ? res.json({"unix": date.getTime(), "utc" : date.toUTCString() }) :
          res.json({"error": "Invalid Date"});
       } 
    }else{
     var newDate = new Date();
     res.json({"unix": newDate.getTime(), "utc" : newDate.toUTCString() });
    }
    
    //Return interger if seconds
    function dateOrSec(d){
       return d.includes('-') ? d : parseInt(d);
    }
})
module.exports = router;