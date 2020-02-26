var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResult(sql, function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getByUname: function(uname, callback){
		var sql = "select * from users where username='"+uname+"'";
		db.getResult(sql, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResult(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	userGetAll:function(q,callback){
		var sql="";
		if (q==null) {
			sql = "select * from users";
		}
		else
		{
			sql = "select * from users where name like '%"+q+"%' or companyName like '%"+q+"%' or username like '%"+q+"%' or id like '%"+q+"%'";
		}
		db.getResult(sql, function(results){
				callback(results);
			
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO users VALUES (null,'"+user.name+"','"+user.comName+"','"+user.contact+"','"+user.username+"','"+user.password+"','"+user.type+"')";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from users where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "UPDATE users SET name='"+user.name+"' ,username='"+user.username+"' , password='"+user.password+"',type='"+user.type+"', contact='"+user.contact+"', companyName='"+user.comName+"' where id="+user.uid;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	jobDetails: function(data, callback){
		var sql="";
		if (data==null) {
			sql = "SELECT * from job";
		}
		else
		{
			sql = "SELECT * from job where companyName like '%"+data+"%' or id like '%"+data+"%' or salary like '%"+data+"%' or jobtTitle like '%"+data+"%' or jobLocation like '%"+data+"%'";
		}
		db.getResult(sql,function(result){
			callback(result);
		});
	},

	jodAdd : function(user, callback){
		var sql = "INSERT INTO job VALUES (null,'"+user.comName+"','"+user.title+"','"+user.loc+"',"+user.sal+")";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	jobGetById: function(id, callback){
		var sql = "select * from job where id="+id;
		db.getResult(sql, function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	jobUpdate: function(user, callback){
		var sql = "UPDATE job SET companyName='"+user.comName+"' ,jobtTitle='"+user.title+"' , jobLocation='"+user.loc+"',salary='"+user.sal+"' where id="+user.id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	jobDelete: function(id, callback){
		var sql = "delete from job where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}