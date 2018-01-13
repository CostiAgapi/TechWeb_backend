var express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser');
  port = 8000;
  bodyParser = require('body-parser');
  sqlite3 = require('sqlite3').verbose();
  translate = require('google-translate-api');
  
  dbUtils = require('./api/utils/dbutils');
  db = dbUtils.createDb();
  // need cookieParser middleware before we can do anything with cookies
  app.use(cookieParser());
  
  app.use(function (req, res, next) {
	  if (typeof req.cookies.sessionId==='undefined') {
		  if(req.path =='/login' || req.path =='/create'){
			  next();
		  }else{
		      res.status(401);
		      res.send("Unauthorized");	 
		  }  
	  } 
	  else{
		next(); // <-- important! calls the next middleware bodyParser adica contiuna sa faca chestii
	  }    
	});

  
  //for json
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
