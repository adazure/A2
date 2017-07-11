module.exports = function(app) {

    app.get('/:sitename/personal/', function(req, res) {
        res.send('hello');
    })

}