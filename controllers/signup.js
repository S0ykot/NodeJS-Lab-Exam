var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var md5 = require('md5');


router.get('/', function(req, res){
	res.render('signup/index');
});



router.post('/', function(req, res){

	var info = {
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		contact : req.body.contact,
		type : "emp",
		comName: req.body.comName
	}

	userModel.insert(info,function(status){
		if (status) {
			res.redirect('login');
		}
		else{
			res.redirect('/');
		}
	});


});





module.exports = router;