module.exports = function(app) {

    app.get('/error', function(req, res) {
        res.send('Aradığınız sayfa bulunamadı');
    });
}