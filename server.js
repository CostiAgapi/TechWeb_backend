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
	  // check if client sent cookie
	  var cookie = req.cookies.sessionId; // the name of the cookit (in our case sessionId)
	  console.log(req.cookies);
	  if (cookie === undefined) {
		// no, set a new cookie
		res.cookie('sessionId','0', { maxAge: 3600, httpOnly: true });
		console.log('cookie created successfully');
	  } 
	  else{
		// yes, cookie was already present 
		console.log('cookie exists', cookie);
	  } 
	  next(); // <-- important! calls the next middleware bodyParser
	});

  
  //for json
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
