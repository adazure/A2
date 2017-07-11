var sites = require("./demo");

module.exports = {
    filter: function(req, res, next) {
        // Eğer ilgili sayfa varsa açsın
        var sitename = req.params.sitename;
        if (sites[sitename])
            next();
        else
            res.redirect("/error");
    }
}