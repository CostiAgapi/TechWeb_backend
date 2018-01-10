'use strict';

	exports.createDb = function() {
		var db = new sqlite3.Database(':memory:', (err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Connected to the in-memory SQlite database.');
		}); 
	};
