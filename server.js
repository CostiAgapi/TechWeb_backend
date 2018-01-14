var express = require('express');
  app = express();
  cors = require('cors');
 
  
  corsOptions = {
   "origin": "*",
   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
   "preflightContinue": false,
   "optionsSuccessStatus": 204,
   "credentials": true
}
  
  
  cookieParser = require('cookie-parser');
  port = 8000;
  bodyParser = require('body-parser');
  sqlite3 = require('sqlite3').verbose();
  translate = require('google-translate-api');
  
  dbUtils = require('./api/utils/dbutils');
  
  app.use(cors(corsOptions));
  
  db = dbUtils.createDb();
  app.set('etag', false); // disable etag
  // need cookieParser middleware before we can do anything with cookies
  app.use(cookieParser());
  
 /* app.use(function (req, res, next) {
	  if (typeof req.cookies.sessionId==='undefined') {
		  if(req.path =='/login' || req.path =='/create' || req.path =='/app'){
			  next();
		  }else{
			  console.log(req.cookies);
		      res.status(401);
		      res.send("Unauthorized");	
		  }  
	  } 
	  else{
		next(); // <-- important! calls the next middleware bodyParser adica contiuna sa faca chestii
	  }    
	}); */

  
  //for json
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
