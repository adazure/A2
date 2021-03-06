//(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
//''''''''''''''''''''''''''''''''''''''''''
// Namespace'ler yükleniyor
var demo = require("./demo");
var path = require("path");
var fs = require("fs");

//''''''''''''''''''''''''''''''''''''''''''
//(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)


//...................................................................
function personal(req, res, next) {
    var temp = getTemplate(req);
    res.render(temp + '/personal.jade', req.config);
}

function personalDetail(req, res, next) {
    var temp = getTemplate(req);
    var config = req.config;
    config.result = {
        name: 'John Steinbeck',
        age: new Date(1984, 01, 14),
        title: 'Software Developer',
        degree: 'Consultant',
        description: 'Odds are you’ve read John Steinbeck’s classic 1937 novel Of Mice and Men, probably in school. The book remains one of the most-assigned novels in the English language. If you somehow managed to avoid it in school and didn’t read it on your own, you’re still likely familiar with the basic outlines of the story, because few novels have penetrated pop culture the way Steinbeck’s has. Without reading a page you likely already know the characters of George—slim, smart, responsible—and Lennie—huge, stupid, and casually violent. You know that the combination of Lennie’s immense strength and childlike mind ends in tragedy.<p>It shouldn’t be much of a surprise that a story conceived during the Great Depression might be critical of capitalism and the American economic system, but you can take that a step further and see the whole story as an indictment of socialism as well—the ranch could be seen as a socialist utopia in a way.</p>',
        image: '/assets/images/Profile-Pic.jpg',
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
    res.render(temp + '/personal-detail.jade', config);
}



//...................................................................





function news(req, res, next) {
    res.render(getTemplate(req) + '/news.jade', req.config);
}



//...................................................................





function gallery(req, res, next) {
    res.render(getTemplate(req) + '/gallery-content.jade', req.config);
}



//...................................................................





function athlete(req, res, next) {
    res.render(getTemplate(req) + '/athletes.jade', req.config);
}

function athleteDetail(req, res, next) {
    res.render(getTemplate(req) + '/athlete-detail.jade', req.config);
}



//...................................................................





function about(req, res, next) {
    res.render(getTemplate(req) + '/about.jade', req.config);
}

function aboutDetail(req, res, next) {
    res.render(getTemplate(req) + '/about-detail.jade', req.config);
}



//...................................................................





function contact(req, res, next) {
    res.render(getTemplate(req) + '/contact.jade', req.config);
}



//...................................................................




function main(req, res, next) {
    res.render(getTemplate(req) + '/index.jade', req.config);
}



//...................................................................





function error(req, res, next) {
    res.render(getTemplate(req) + '/error.jade', req.config);
}



//...................................................................




// Her route edilen sayfalar için öncelikle çağırılan method
// Bir nevi filtre görevi görmekte ve ilgili sayfalara yönlendirme yapmaktadır.
function callback(req, res, next) {



    // İlgili sayfa içinde append edilen data nesnesi
    // İçerisinde, sayfa içinde kullanılabilecek url bilgileri, datalar, isimler ve methodlar taşıyabilen bir nesne

    var config = {
        // Company Private Name -> google
        controller: req.params.controller,
        // Company Sub Page name -> about
        action: req.params.action,
        // ?
        actionName: route[req.params.action],
        // Company Id Number/Name on Sub Page
        id: req.params.id,
        // Company Link -> /google
        pathController: '/' + req.params.controller,
        // Company Subpage Link -> /google/about
        pathAction: '/' + req.params.controller + '/' + req.params.action,
        // Company ID link on Subpage -> /google/about/10 yada vision/mission/what-are-we
        pathId: '/' + req.params.controller + '/' + req.params.action + '/' + req.params.id,
        // Dil dosyası
        lang: null,
        // Sayfa içerisinde kullanılacak varsa data bilgisi
        result: null
    };

    // Config dosyasını request içerisine gömelim
    req.config = config;


    // 3 ayrı isim alan bir yapı oluşturduk
    // <@param Controller> ismi ile Company bilgisi alınmakta
    // <@param Action> ismi ile Company'e ait alt sayfa adı alınmakta
    // <@param Id> ismi ile de alt sayfada açtırılacak, yapılacak veya yapılması istenen 3. işlemler için alıyoruz


    // Controller/Actions/Id
    if (req.params.controller && req.params.action && req.params.id) {
        if (route[req.params.action])
            route[req.params.action].id(req, res, next);
        else
            error(req, res, next);

    }
    // Controller/Action
    else if (req.params.controller && req.params.action) {
        if (route[req.params.action])
            route[req.params.action].action(req, res, next);
        else
            error(req, res, next);

    }
    // Controller
    else if (req.params.controller) {
        route.default(req, res, next);
    }
    // ?
    else {
        error(req, res, next);
    }
}



//...................................................................





// İlgili kullanıcıya göre, kullanıcının seçmiş olduğu template'i varsayılan olarak yolunu seçer
function getTemplate(req) {
    if (req.params.controller) {
        if (demo[req.params.controller]) {
            req.config.lang = lang['en'];
            return path.resolve("views/template-lightblue");
        } else {
            return path.resolve("views/public");
        }
    }

    return path.resolve("views/public");
}



//...................................................................




// Dil dosyası
var lang = {
    tr: {
        home: { title: 'Anasayfa', url: '', pagetitle: "Web sitemize hoş geldiniz" },
        news: { title: 'Haberler', url: 'haberler', pagetitle: "Haberler" },
        contact: { title: 'İletişim', url: 'iletisim', pagetitle: "İletişim" },
        gallery: { title: 'Galeri', url: 'galeri', pagetitle: "Galeri" },
        personal: { title: 'Personel', url: 'personel', pagetitle: "Personel" },
        athletes: { title: 'Sporcular', url: 'sporcular', pagetitle: "Sporcular" },
        about: { title: 'Hakkımızda', url: 'hakkimizda', pagetitle: "Hakkımızda" },
        worktime: { title: 'Antreman Programı', url: 'antreman-programi', pagetitle: "Antreman Programı" },
        aboutread: 'HAKKINDA'
    },
    en: {
        home: { title: 'Home Page', url: '', pagetitle: "Welcome Our Web Site" },
        news: { title: 'Our News', url: 'news', pagetitle: "Our News" },
        contact: { title: 'Contact Us', url: 'contact', pagetitle: "Contact Us" },
        gallery: { title: 'Gallery', url: 'gallery', pagetitle: "Gallery" },
        personal: { title: 'Personals', url: 'personal', pagetitle: "Personals" },
        athletes: { title: 'Athletes', url: 'athletes', pagetitle: "Athletes" },
        about: { title: 'About Us', url: 'about', pagetitle: "About Us" },
        worktime: { title: 'Worktime', url: 'worktime', pagetitle: "Worktime" },
        aboutread: 'ABOUT'
    }
};



//...................................................................



// Template'ler üzerinde kullanılacak linklendirme ve kullanılacak methodları belirler
// Route içerisine belirtilen key değeri, açılmak istenen sayfaların adlarını simgeler
// Object tipindeki nesne de, kullanılacak parametrelere göre şekillenir
// Biz platformumuzu 3 ana route üzerine kurduk
// Controller, Action ve Id
// Burada ki tanımlamalara göre action ve id route değerlerine ilgili methodları atadık.
var route = {

    //TR
    haberler: { action: news },
    iletisim: { action: contact },
    galeri: { action: gallery },
    ekibimiz: { action: personal, id: personalDetail },
    sporcular: { action: athlete, id: athleteDetail },
    hakkinda: { action: about, id: aboutDetail },

    //EN
    news: { action: news },
    contact: { action: contact },
    gallery: { action: gallery },
    personal: { action: personal, id: personalDetail },
    athletes: { action: athlete, id: athleteDetail },
    about: { action: about, id: aboutDetail },

    //ALL
    default: main,
    error: error,
    callback: callback
};



//...................................................................





module.exports = route;