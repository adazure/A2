var express = require("express");
var app = express();
var parser = require("body-parser");
var timeout = require('connect-timeout');


// Middleware

app.use('/assets', express.static('assets'));
app.set('view options', { layout: false });
app.set('view engine', 'jade')
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(timeout('30s'))

// Pages
require("./route/error")(app);
require("./route/site")(app);

app.listen(12345);