var express = require("express");
var app = express();
var parser = require("body-parser");


// Middleware

app.use('/assets', express.static('assets'));
app.set('view options', { layout: false });
app.set('view engine', 'jade')
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


// Pages
require("./route/error")(app);
require("./route/site")(app);
require("./route/personal")(app);
require("./route/contact")(app);


app.listen(12345);