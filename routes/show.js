var express = require('express');
var router = express.Router();
var util = require('util');

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  database : 'laos',
  user : 'guest',
  password : '1234'
  //password : 'aOVG1L2xDC'
});

router.route('/').get(function (req, res){
  res.render('test', {data:'default show'});
});

router.route('/chart/:pid').get(function(req, res){
  var query =
    "select cid, pid, medical_chart, prescription, oriental_chart, oriental_prescription, lab, memo, "+
    "DATE_FORMAT(createTime, '%Y-%m-%d %h:%i %p') as createTime from chart where pid ="+ req.params.pid+
    " ORDER BY createTime DESC;";
  console.log(query);
  pool.query(query, function(err, rows, fields){
    if(err) throw err;
    res.type('text/plain');
    res.send(JSON.stringify(rows));
  });
});

router.route('/patient').get(function(req, res){
  var query = "SELECT pid, pname, DATE_FORMAT(birth, '%Y-%m-%d') as birth , sex, address FROM patient ORDER BY reciept_datetime DESC;";
  pool.query(query, function(err, rows, fields) {
    if (err) throw err;
    res.type('text/plain');
    res.send(JSON.stringify(rows));
  });
});

module.exports = router;
