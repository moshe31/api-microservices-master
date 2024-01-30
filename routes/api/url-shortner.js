const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dns = require('dns');

//Body Parser
router.use(bodyParser.urlencoded({extended: false}));

//Generate short url
function generateUrl(){
    let shortUrl = "";
    const length = 6;
    const mix = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++){
        shortUrl += mix.charAt(Math.floor(Math.random() * mix.length));
    }
    return shortUrl;
}
//Regex for Valid url, credit goes to https://stackoverflow.com/a/17773849
const validator = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gm;

var store = {
    "fkK360": "https://www.youtube.com/watch?v=Ouz4JGzXruI",
};

//if url already exists
function findUrl(url){
    for(let key in store){
        if(store[key] === url){
            return key;
        }
    }
    return false;
}
//@route  POST
//@desc   Parse and Return a short version of a url.
//@access Public
router.post('/new', function(req, res){
    if(req.body.url !== "" && req.body.url.match(validator)){
        const matched = findUrl(req.body.url);
        
        if(matched){
            res.json({"original_url": store[matched], "short_url": matched});  
        } else {
            var host = req.body.url.match(/[^http:\/\/][^https:\/\/](.*)/gmi).join("");
            host = host.split('/')[0];
            dns.lookup(host, function(err, address, family){
                if(err){
                   res.json({"error": "invalid URL"});

                } else {
                    let shortUrl = generateUrl();
                    store[shortUrl] = req.body.url;
                    res.json({"original_url": req.body.url, "short_url": shortUrl});
                }
            })
            
        }
    } else {
        res.json({"error": "invalid URL"});  
    }
});

//@route  GET
//@desc   Redirect with short url.
//@access Public
router.get('/:word?', function(req, res){
    const url = store[req.params.word];
    url !== undefined ? 
    res.redirect(url.match(/(http:\/\/)|(https:\/\/)/gmi) ? url : "http://" + url) : 
    res.json({"error": "invalid URL"});
   });


module.exports = router;