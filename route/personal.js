module.exports = function(app) {

    app.get('/:sitename/personal/:id', function(req, res) {
        var data = {
            name: 'John Steinbeck',
            age: new Date(1984, 01, 14),
            title: 'Software Developer',
            degree: 'Consultant',
            description: 'Odds are you’ve read John Steinbeck’s classic 1937 novel Of Mice and Men, probably in school. The book remains one of the most-assigned novels in the English language. If you somehow managed to avoid it in school and didn’t read it on your own, you’re still likely familiar with the basic outlines of the story, because few novels have penetrated pop culture the way Steinbeck’s has. Without reading a page you likely already know the characters of George—slim, smart, responsible—and Lennie—huge, stupid, and casually violent. You know that the combination of Lennie’s immense strength and childlike mind ends in tragedy.<p>It shouldn’t be much of a surprise that a story conceived during the Great Depression might be critical of capitalism and the American economic system, but you can take that a step further and see the whole story as an indictment of socialism as well—the ranch could be seen as a socialist utopia in a way.</p>',
            image: 'http://neesham.net/wp-content/uploads/2016/01/Profile-Pic.jpg',
            awards: [
                'No sign-up fee',
                'No minimum purchase',
                'No card or ID to carry',
                'Valid with other discount coupons',
                'No accumulation time frame',
                'Valid on all regular and sale price items',
                'Record of purchase history for easier shopping',
                'Access to exclusive PR events and shopping offers'
            ]
        };
        res.render('personal-detail', data);
    })
    app.get('/:sitename/personal', function(req, res) {
        res.render('personal', { url: req.url + '/' });
    })

}