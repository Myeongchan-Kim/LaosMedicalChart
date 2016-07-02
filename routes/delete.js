var express = require('express');
var router = express.Router();
var util = require('util');

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : 'localhost',
  database : 'laos',
  user : 'guest',
  password : 'aOVG1L2xDC'
});

router.route('/')
.get(function (req, res){
  res.render('test', {data:"default delete"});
});

module.exports = router;
