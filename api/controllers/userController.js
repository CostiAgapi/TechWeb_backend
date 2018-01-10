'use strict';

exports.testRequest = function(req, res) {
    res.send({
      raspuns : "merge"
    });
  };

exports.login = function(req, res) {
    var object = req.body;
    var cookie = req.headers;
    console.log(cookie);
    res.send(object);
  };
