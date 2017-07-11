module.exports = function(app) {

    app.get('/:sitename/personal/:id', function(req, res) {
        res.render('personal');
    })
    app.get('/:sitename/personal', function(req, res) {
        res.render('personal');
    })

}