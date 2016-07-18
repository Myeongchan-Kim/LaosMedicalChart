var express = require('express');
var app = express();
var handlebars = require('express-handlebars')
.create({
  defaultLayout:'main',
  helpers: {
      'range': require('handlebars-helper-range'),
      'ifCond' : function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        } // switch
      }//ifCond
    }// helpers
}); //템플릿

var Handlebars = require("handlebars");


var bodyparser = require('body-parser').urlencoded({extended:true}); //form 평문전달

app.use(bodyparser);
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.render('index', {mode:"patient"});
});

var showPage =  require('./routes/show');
app.use('/show', showPage);

var searchPage =  require('./routes/search');
app.use('/search', searchPage);

var addPage = require('./routes/add');
app.use('/add', addPage);

var modifyPage = require('./routes/modify');
app.use('/modify', modifyPage);

var deletePage = require('./routes/delete');
app.use('/delete', deletePage);

app.use(function (req, res){
  res.type('text/plain');
  res.status('404');
  res.send('404 - Page not found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function (){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
