var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
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
			res.render('empl/index', {user: result});
		});

	}else{
		res.redirect('/logout');
	}
});

router.get('/allJob', function(req, res){

	if(req.cookies['token'] != null){
		userModel.jobDetails("",function(results){
			res.render('empl/allJob', {userlist: results});
		
	});

	}else{
		res.redirect('/logout');
	}

	
});


router.get('/add', function(req, res){

	res.render('empl/add');
});

router.post('/add', function(req, res){

	var info = {
		title : req.body.title,
		loc : req.body.loc,
		sal : req.body.sal,
		comName: req.body.comName
	}

	userModel.jodAdd(info,function(status){
		if (status) {
			res.redirect('alljob');
		}
		else{
			res.redirect('add');
		}
	});


});



router.get('/edit/:id', function(req, res){
	var ID = req.params.id;
	userModel.jobGetById(ID,function(results){
		if(results!=null){
			res.render('empl/edit', {details: results});
		}else{
			res.send('Not working');
		}
	});
});


router.post('/edit/:id', function(req, res){
	var info = {
		id : req.params.id,
		title : req.body.title,
		loc : req.body.loc,
		sal : req.body.sal,
		comName: req.body.comName
	};
	userModel.jobUpdate(info,function(status){
		if(status){
			res.redirect('../allJob');
		}else{
			res.send('Not working');
		}
	});
});


router.get('/del/:id', function(req, res){
	var ID = req.params.id;
	userModel.jobGetById(ID,function(results){
		if(results!=null){
			res.render('empl/del', {details: results});
		}else{
			res.send('Not working');
		}
	});
});


router.post('/del/:id', function(req, res){
	var ID = req.params.id;
	userModel.jobDelete(ID,function(status){
		if(status){
			res.redirect('../allJob');
		}else{
			res.send('Not working');
		}
	});
});


router.get('/Jsearch/:key', function(req, res){
	var keyword = req.params.key;
	console.log("search");
	userModel.userGetAll(keyword,function(results){
			res.render('home/search', {data: results});
	});
});





module.exports = router;

