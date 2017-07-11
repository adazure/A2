var express = require("express");
var app = express();
var parser = require("body-parser");
var fs = require('fs');
var error = require("./route/error")(app);
var site = require("./route/site")(app);
var personal = require("./route/personal")(app);
var path = require("path");
// Middleware

app.use('/assets', express.static('assets'));
app.set('view options', { layout: false });
app.set('view engine', 'jade')
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


app.listen(12345);