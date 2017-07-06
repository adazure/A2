var path = require("path");
var fs = require("fs");
var root = path.resolve('views');
module.exports = function (app) {


    // Queryden gelen parametreleri alıyoruz
    function getParams(req) {
        var param = req.params;

        // Bizim belirlediğimiz parametreler
        return { site: param.sitename, page: param.pagename };
    }

    // Gelen query bilgisi, yani sitename eğer bazı kelimeleri içeriyorsa NEXT() diyip devam edeceğiz, değilse kontrole sokacağız
    function isFilter(req, action) {
        var param = getParams(req);
        if (/assets/i.test(param.site)) {
            action(param);
            return false;
        }
        return true;
    }

    function getURL(req, next) {
        var param = getParams(req);
        param.layout = false;
        if (param.page) {
            param.page = root + '/sites/' + param.page;
        }
        else if (!param.page) {
            param.page = root + '/sites/index.jade';
        }
        else
            param.page = root + '/sites/error.jade';

        return param;
    }


    // Çağırılan URL bilgisinin tetikleneceği fonksiyon
    function callback(req, res, next) {

        // Eğer özel dosya yolları varsa
        var result = isFilter(req, function (param) {

            var n = path.resolve(param.site + '/' + param.page);

            // Gelen dosyanın yolunu kontrol ederek. Aradığı dosyayı veya sayfayı bulamadığında özel bir uyarı sayfası gösterelim
            if (!fs.existsSync(n)) {
                res.render('nofile');
            }
            else
                res.sendFile(n);
        });

        if (result) {
            var data = getURL(req);
            res.render(data.page);
        }
    }

    app.get('/:sitename/:pagename', callback);

    app.get('/:sitename', callback);

}