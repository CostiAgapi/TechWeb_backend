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
					if(row==undefined){
						res.status(401);
						res.send("User does not exist");
					}else{
						res.status(200);
						res.send("fdgfdg");
					}
				});
};

exports.createAcount = function(req, res) {
	var user = dbUtils.getUserWithUsername(req.body.username);
	console.log(user);
	if(req.body.password!==user.password){
		res.status(401);
		res.send("User does not exist");
	}else{
		res.status(200);
		res.send("ok");
	}
	
}
