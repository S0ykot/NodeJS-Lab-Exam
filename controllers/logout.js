var express = require('express');
var router = express.Router();

router.get('/', function(req, res){

	//req.session.username = null;
	res.clearCookie('token');
	res.clearCookie('uname');
	res.redirect('/login');
});

module.exports = router;

