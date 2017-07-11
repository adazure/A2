module.exports = function(app) {

    app.get('/:sitename/contact', function(req, res) {
        res.render('contact');
    });
}