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
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
                config.elements[f] = q[n];
        }
    })(contactForm[0].elements);


    //..................................................................................................





    // Form post edilmek istendiğinde çalıştırılacak method
    function postEvent(e) {


        // Form gönderilmeye çalışırken tüm olay işlemlerini iptal eder
        e.preventDefault();



        (function (q) {
            Object.keys(q).forEach(function (key) {
                if (!q[key].value && q[key].hasAttribute('required'))
                    showTooltip(q[key], q[key].getAttribute('data-err'), !q[key].value);
            });
        })(config.elements);


        return false;
    }

    contactForm[0].addEventListener('submit', postEvent);

})();