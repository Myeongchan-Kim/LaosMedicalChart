var express = require('express');
var router = express.Router();
var util = require('util');

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  database : 'laos',
  user : 'guest',
  password : 'aOVG1L2xDC'
});

router.route('/').get(function (req, res){
  res.render('test', {data:'default show'});
});

router.route('/patient').get(function(req, res){
  var query = "SELECT * FROM patient ORDER BY pid DESC;";
  pool.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.type('text/plain');
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
