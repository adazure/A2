var sites = require("./demo");
var path = require("path");
module.exports = function(app) {

    // Arama motorları için Caching yapalım
    app.get('*', function(req, res, next) {

        res.set('x-powered-by', 'Adazure Interactive ©');
        if (req.params.sitename && req.params.sitename == 'assets')
            res.set('Cache-Control', 'max-age=990000');
        else
            res.set('Cache-Control', 'max-age=99999');

        next();
    });

    function control(req, res, next) {

        var _path = path.resolve('views/public');

        if (req.params.sitename) {

            if (sites[req.params.sitename] && req.params.pagename) {
                _path = path.resolve('views/template-lightblue');
                app.set('views', _path);
                next();
            }
            // Gelen site adı veritabanında varsa ve pagename, yani alt sayfa yoksa
            // ilgili sayfanın template değerini al ve ona göre aç
            else if (sites[req.params.sitename] && !req.params.pagename) {
                _path = path.resolve('views/template-lightblue');
                app.set('views', _path);
                res.render(_path + '/index.jade');
            }
            // Static sayfalarda var mı kontrol et

            // Aranılan sayfa yoksa hata sayfasına düşsün
            else if (!sites[req.params.sitename] && !req.params.pagename) {
                app.set('views', _path);
                res.render(_path + '/error.jade');
            }
        } else {
            app.set('views', _path);
            res.render(_path + '/index.jade');
        }



    }

    app.get('/:sitename/:pagename/:id', control);
    app.get('/:sitename/:pagename', control);
    app.get('/:sitename', control);
    app.get('/', control);

}