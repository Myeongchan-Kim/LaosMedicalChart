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
    if (err) throw err;
    res.type('text/plain');
    res.send(JSON.stringify(rows[0][0]));
  });
});

router.route('/patient').get(function(req, res){
  res.render('newPatient', {data:"patient add"});
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
  if(req.body.sBP){
    colQuery += ", systolicBP";
    valQuery += util.format(", %s", req.body.sBP);
  }
  if(req.body.dBP){
    colQuery += ", diastolicBP";
    valQuery += util.format(", %s", req.body.dBP);
  }
  if(req.body.pulse){
    colQuery += ", pulse";
    valQuery += util.format(", %s", req.body.pulse);
  }
  if(req.body.temperature){
    colQuery += ", temperature";
    valQuery += util.format(", %s", req.body.temperature);
  }
  if(req.body.bst){
    colQuery += ", bst";
    valQuery += util.format(", %s", req.body.bst);
  }
  if(req.body.height){
    colQuery += ", height";
    valQuery += util.format(", %s", req.body.height);
  }
  if(req.body.weight){
    colQuery += ", weight";
    valQuery += util.format(", %s", req.body.weight);
  }
  if(req.body.spo2){
    colQuery += ", spo2";
    valQuery += util.format(", %s", req.body.spo2);
  }
  colQuery += ")";
  valQuery += ")";
  var query = "INSERT INTO patient " + colQuery +" VALUES " + valQuery + ";"
  console.log(query);
  pool.query(query, function(err, rows, fields) {
    if (err) {
      res.render('/add/patient', {patient_info :req.body , err: err});
    }else{
      res.redirect('/');
    }
  });
});

module.exports = router;
