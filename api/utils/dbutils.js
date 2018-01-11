'use strict';

	exports.createDb = function() {
		var db = new sqlite3.Database(':memory:', (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to the in-memory SQlite database.');
		});
		
		db.serialize(function() {
			db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT NOT NULL UNIQUE,password TEXT NOT NULL,diary TEXT)");
			db.run("INSERT INTO users (username,password) VALUES ('nume_user','parola')");
			db.run("INSERT INTO users (username,password) VALUES ('nume_user2','parola2')");
		});
		
		return db;
	};
	
	exports.showDb = function(){
		let sql="SELECT * from users";
		db.each(sql, [], (err, row) => {
			  if (err) {
				throw err;
			  }
			  console.log(`${row.id} ${row.username} - ${row.password}`);
			});
	}
	
	exports.getUserWithUsername = function(username){
		var users = [];
		let sql=`SELECT * from users WHERE username=?`;
		db.get(sql, [username], (err, row) => {
				users.push(row);
				});
		return users[0];
	}


