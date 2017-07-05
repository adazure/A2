var express = require("express");
var app = express();
var parser = require("body-parser");
var fs = require('fs');
var home = require("./route/home")(app);
var sites = require("./route/sites")(app);
var path = require("path");
// Middleware

app.use('/assets', express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


app.listen(process.env.port || 8080);