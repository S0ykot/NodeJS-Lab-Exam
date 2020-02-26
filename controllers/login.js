var express 	= require('express');
const { check, validationResult } = require('express-validator/check');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');
var md5 = require('md5');

router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/index');
});

router.get('/', function(req, res){
	console.log('login page requested!');
	res.render('login/error');
});


router.post('/',[check('username','null uname').not().isEmpty(),check('password','null pass').not().isEmpty()], function(req, res){
		
		var errors = validationResult(req);
	  if (!errors.isEmpty()) {
	    console.log(errors.mapped());
	    res.render("login/error",{error:errors.mapped()});
		}
		else
		{
			var user ={
			username: req.body.username,
			password: req.body.password
		};

		userModel.validate(user, function(status){
			if(status){
				userModel.getByUname(req.body.username,function(get){
					type = get.type;
					if (type=='adm') {
					 	res.cookie('token', type);
					 	res.cookie('uname', req.body.username);
					 	res.redirect('/home');
					}else
					{
						type = get.type;
					 	res.cookie('token', type);
					 	res.cookie('uname', req.body.username);
					 	res.redirect('/empl');
					}
				});
				
				
				
			}else{
				res.redirect('/login');
				//console.log("failed");
			}
		});
		}
});

module.exports = router;

