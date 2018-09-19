var express = require('express');

var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.set('port', 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// healthCheckCron.runCron();

app.use(favicon(__dirname + '/static/dist/favicon.ico'));
app.get('/', function (req, res) {
    res.redirect('/dist/#')
});

if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, './static')));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {
    app.use(express.static(path.join(__dirname, './static')));
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.get('/nodeenv', function(req, res, next){

});

console.log(3000);
app.listen(3000);
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});


module.exports = app;
