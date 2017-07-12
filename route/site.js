//(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)

var sites = require("./demo");
var lang = require("./lang");

//(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)


module.exports = function(app) {


    // Arama motorları için Caching yapalım
    app.get('*', function(req, res, next) {

        // Sunucu adını kendimiz belirleyelim
        res.set('x-powered-by', 'Adazure Interactive ©');

        // Özel dosyalar için maksimum cache ayarı
        if (req.params.controller && req.params.controller == 'assets')
            res.set('Cache-Control', 'max-age=990000');
        // Daha fazla önemli dosyalar için cache ayarı
        else
            res.set('Cache-Control', 'max-age=99999');

        next();
    });



    //...............................................................

    app.get('/:controller/:action/:id', lang.callback);
    app.get('/:controller/:action', lang.callback);
    app.get('/:controller', lang.callback);
    app.get('/', lang.callback);

}