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
						res.setHeader('Content-Type', 'application/json');
						res.status(200);
						res.send(JSON.stringify({response : "Login ok"}));
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
			 res.setHeader('Content-Type', 'application/json');
			 res.status(200);
			 res.send(JSON.stringify({response : "Account created"}));
		}
  });
}

exports.saveOrUpdateDiary = function(req, res) {
			db.run(`INSERT INTO diaries(usrnm,message,date) VALUES(?,?,datetime('now'))`,[req.body.username,req.body.diaryText], function(err) {
				if (err) {
				 console.log(err);
				 res.status(500);
				 res.send("Cannot insert into diary, DB server problem");
				}else{
					 res.setHeader('Content-Type', 'application/json');
					 res.status(200);
					 res.send(JSON.stringify({response : "Diary added"})); 
				}
			});
}

exports.translate = function(req, res) {
			translate(req.body.diaryText, {to: req.body.language}).then(trans => {
				console.log(trans);
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			res.send(JSON.stringify({translated : trans.text}));
			}).catch(err => {
				console.error(err);
			});
}

exports.getUserDiary = function(req,res){
		let sql=`SELECT * from users INNER JOIN diaries ON username=usrnm  WHERE username=?`;
				db.all(sql, [req.query.username], (err, row) => {
					if(err){
						console.log(err);
						res.status(500);
						res.send("Cannot insert into diary, DB server problem");
					}else{
						res.setHeader('Content-Type', 'application/json');
						res.status(200);
						console.log(row);
						res.send(JSON.stringify({response : row})); 
					}
			});
			
}
