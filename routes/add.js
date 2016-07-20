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

router.route('/').get(function (req, res){
  res.render('test', {data:"default delete"});
});

router.route('/chart/:pid').post(function(req, res){
  var query = util.format("call insert_chart(%d);", req.params.pid);
  pool.query(query , function(err, rows, fields){
    if (err) {
      console.log(query);
      console.log(err);
    }
    res.type('text/plain');
    res.send(JSON.stringify(rows[0][0]));
  });
});

router.route('/patient').get(function(req, res){
  res.render('newPatient', {data:"patient add", mode:"patient"});
});

router.route('/patient').post(function(req, res){
  var colQuery = "(pname, birth, sex ";
  var valQuery = util.format(" ( '%s', '%s', '%s' ", req.body.pname, req.body.birth, req.body.sex);
  if(req.body.phone){
    colQuery += ", phone";
    valQuery += util.format(", '%s'", req.body.phone);
  }
  if(req.body.address){
    colQuery += ", address";
    valQuery += util.format(", '%s'", req.body.address);
  }
  if(Number(req.body.sBP)){
    colQuery += ", systolicBP";
    valQuery += util.format(", %s", parseInt(req.body.sBP));
  }
  if(Number(req.body.dBP)){
    colQuery += ", diastolicBP";
    valQuery += util.format(", %s", parseInt(req.body.dBP));
  }
  if(Number(req.body.pulse)){
    colQuery += ", pulse";
    valQuery += util.format(", %s", parseInt(req.body.pulse));
  }
  if(Number(req.body.temperature)){
    colQuery += ", temperature";
    valQuery += util.format(", %s", parseFloat(req.body.temperature));
  }
  if(Number(req.body.bst)){
    colQuery += ", bst";
    valQuery += util.format(", %s", parseInt(req.body.bst));
  }
  if(Number(req.body.height)){
    colQuery += ", height";
    valQuery += util.format(", %s", parseFloat(req.body.height));
  }
  if(Number(req.body.weight)){
    colQuery += ", weight";
    valQuery += util.format(", %s", parseFloat(req.body.weight));
  }
  if(Number(req.body.spo2)){
    colQuery += ", spo2";
    valQuery += util.format(", %s", req.body.spo2);
  }
  colQuery += ")";
  valQuery += ")";
  var query = "INSERT INTO patient " + colQuery +" VALUES " + valQuery + ";"
  pool.query(query, function(err, rows, fields) {
    if (err) {
      console.log(query);
      console.log(err);
      res.redirect('/add/patient');
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
