/*
    (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    İletişim sayfasından yapılacak olan postlar için kullanılacak dosya
    Form üzerindeki datalar otomatik olarak çekilerek belirli kontrollerden geçmektedir.

    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
*/


(function () {

    // Sayfa üzerindeki form datalarını al
    var contactForm = document.getElementsByTagName('form');

    // Bir form datası yoksa iptal et
    if (!contactForm) return;

    // Form sayısı 0'a eşitse iptal et
    if (contactForm.length == 0) return;

    // Form adı mutlaka contact-form olmalı, değilse iptal et
    if (contactForm[0].id != 'contact-form') return;


    //..................................................................................................




    // Formda yapılacak kontroller ve işlemlerle ilgili regular expression'lar ve methodlar tanımlanıyor
    var config = {

        // Regular expressions
        expression: {
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            gsm: /^\+{0,1}\d+$/
        },

        // Form içerisindeki input, textarea, button vs nesnelerin tutulduğu alan
        // Nesne ad tanımlamaları ID veya NAME özelliğine sahip nesneler burada tutulur
        elements: {}
    };




    //..................................................................................................


    // Form nesnesi içerisindeki tüm nesneleri bulur ve element tablosuna ekler
    (function (q) {
        for (var n = 0, f = ""; n < q.length; n++) {
            f = q[n].id || q[n].name;
            if (f)
                config.elements[f] = {
                    obj: q[n],
                    error: q[n].getAttribute('data-err'),
                    required: q[n].hasAttribute('required')
                };
        }
    })(contactForm[0].elements);


    //..................................................................................................





    // Form post edilmek istendiğinde çalıştırılacak method
    function postEvent(e) {


        // Form gönderilmeye çalışırken tüm olay işlemlerini iptal eder
        e.preventDefault();


        var result = true;

        // Her elemanı 'Required' özelliğine göre boş olup olmadığı kontrol ediliyor
        // Boş alanlar için kullanıcıya uyarı mesajları gösteriyoruz

        (function (q) {
            Object.keys(q).forEach(function (key) {
                var e = q[key];
                if (!e.obj.value && e.required) {
                    result = false;
                    showTooltip(e.obj, e.error, true);
                }
            });
        })(config.elements);


        // Uyarı mesajları varsa, buradan sonrasını işletme
        if (!result) return;

        // Ek filtre ile, alanların tam olarak istediğimizi karşılayıp karşılamadığına bakalım

        var _target = config.elements.email;
        if (!config.expression.email.test(_target.obj.value)) {
            showTooltip(_target.obj, _target.error, true);
            return;
        }

        // Eğer telefon numarası girildiyse, numeric karakterler olduğundan emin olalım
        var _target = config.elements.gsm;
        if (_target.obj.value && !config.expression.gsm.test(_target.obj.value)) {
            showTooltip(_target.obj, _target.error, true);
            return;
        }

        console.log('burad');
        return false;
    }

    contactForm[0].addEventListener('submit', postEvent);

})();