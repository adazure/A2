var sites = require("./demo");
module.exports = function(app) {

    app.get('*', function(req, res, next) {

        res.set('x-powered-by', 'Adazure Interactive ©');
        if (req.params.sitename && req.params.sitename == 'assets')
            res.set('Cache-Control', 'max-age=990000');
        else
            res.set('Cache-Control', 'max-age=99999');
        next();
    });

    app.get('/', function(req, res) {
        res.redirect("/adazure");
    });

    app.get('/:sitename', function(req, res, next) {
        if (sites[req.params.sitename])
            next();
        else
            res.redirect("/error");

    });
}