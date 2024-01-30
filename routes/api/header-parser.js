const express = require('express');
const router = express.Router();

//@route  GET api/whoami
//@desc   Return IP address, prefered language, device info
//@access Public
router.get('/', (req, res) => {
    res.json({"ipaddress": req.ip,
              "language": req.headers['accept-language'],
              "software": req.headers['user-agent']
        });
});

module.exports = router; 