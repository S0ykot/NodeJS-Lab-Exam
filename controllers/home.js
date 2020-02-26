var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
const { check, validationResult } = require('express-validator');
var md5 = require('md5');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




router.get('/', function(req, res){
	
	if(req.cookies['token'] != null){
		console.log(req.cookies['token']);
		userModel.getByUname(req.cookies['uname'], function(result){
			res.render('home/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){

	if(req.cookies['token'] != null){
		userModel.userGetAll(null,function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('no users found');
		}
	});

	}else{
		res.redirect('/logout');
	}

	
});


router.get('/add', function(req, res){

	res.render('home/add');
});

router.post('/add', function(req, res){

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
			res.redirect('alluser');
		}
		else{
			res.redirect('add');
		}
	});


});



router.get('/edit/:id', function(req, res){
	var ID = req.params.id;
	userModel.getById(ID,function(results){
		if(results!=null){
			res.render('home/edit', {details: results});
		}else{
			res.send('Not working');
		}
	});
});


router.post('/edit/:id', function(req, res){
	var info ={
		uid : req.params.id,
		name : req.body.name,
		username : req.body.username,
		password : req.body.password,
		contact : req.body.contact,
		type : req.body.type
	};
	userModel.update(info,function(status){
		if(status){
			res.redirect('../alluser');
		}else{
			res.send('Not working');
		}
	});
});


router.get('/del/:id', function(req, res){
	var ID = req.params.id;
	userModel.getById(ID,function(results){
		if(results!=null){
			res.render('home/del', {details: results});
		}else{
			res.send('Not working');
		}
	});
});


router.post('/del/:id', function(req, res){
	var ID = req.params.id;
	userModel.delete(ID,function(status){
		if(status){
			res.redirect('../alluser');
		}else{
			res.send('Not working');
		}
	});
});


router.get('/empSearch', function(req, res){
	userModel.userGetAll(null,function(results){
			res.render('home/empSearch', {data: results});
	});
});

router.get('/search/:key', function(req, res){
	var keyword = req.params.key;
	console.log("search");
	userModel.userGetAll(keyword,function(results){
			res.render('home/search', {data: results});
	});
});





module.exports = router;

