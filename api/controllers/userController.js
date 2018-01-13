'use strict';

exports.testRequest = function(req, res) {
    res.send({
      raspuns : "merge"
    });
	dbUtils.showDb();
  };

exports.login = function(req, res) {
		let sql=`SELECT * from users WHERE username=?`;
		db.get(sql, [req.body.username], (err, row) => {
					if(row==undefined || row.password!=req.body.password){
						res.status(401);
						res.send("User does not exist or password incorrect");
					}else{
						res.cookie('sessionId',`${row.username}`, { maxAge: 3600, httpOnly: true });
						res.status(200);
						res.send(); 
					}
				});
};

exports.createAcount = function(req, res) {
	db.run(`INSERT INTO users(username,password) VALUES(?,?)`, [req.body.username,req.body.password], function(err) {
		if (err) {
		 console.log(err);
		 res.status(500);
		 res.send("User already in DB, choose other username");
		}else{
			 var cookie = req.cookies.sessionId;
			 res.cookie('sessionId',`${req.body.username}`, { maxAge: 3600, httpOnly: true });
			 res.status(200);
			 res.send("User added");
		}
  });
}

exports.saveOrUpdateDiary = function(req, res) {
			db.run(`INSERT INTO diaries(usrnm,message,date) VALUES(?,?,datetime('now'))`,[req.body.username,req.body.message], function(err) {
				if (err) {
				 console.log(err);
				 res.status(500);
				 res.send("Cannot insert into diary, DB server problem");
				}else{
					 res.status(200);
					 res.send("Diary added");  
				}
			});
}

exports.translate = function(req, res) {
			translate(req.body.toTranslate, {to: 'en'}).then(trans => {
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			res.send(JSON.stringify({translated : trans.text}));
			}).catch(err => {
				console.error(err);
			});
}

exports.getUserDiary = function(req,res){
		let sql=`SELECT * from users INNER JOIN diaries ON username=usrnm  WHERE username=?`;
				db.get(sql, [req.cookies.sessionId], (err, row) => {
					if(err){
						console.log(err);
						res.status(500);
						res.send("Cannot insert into diary, DB server problem");
					}
					console.log(req.cookies.sessionId);
					console.log(row);
					res.status(200);
					res.send();
			});
}
