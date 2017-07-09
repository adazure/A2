function initMap() {
    var uluru = { lat: 41.038019, lng: 29.0671815 };
    var map = new google.maps.Map(document.getElementById('googlemap'), {
        zoom: 16,
        center: uluru,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
    });
    var center = map.getCenter();
    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
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
/*
    (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

    Eğer result değeri false ise, yani en az bir gerekli alan boş bırakılmışsa mesajları gösterelim
    @param obj         ->    Oluşturulan tooltip nesnesinin hangi nesnenin arkasında gösterilecekse o nesnenin kendisi
    @param message     ->    Gösterilecek mesaj
    @status            ->    Mesajın gösterilip gösterilmeyeceği

    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    (-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)(-)
*/

function showTooltip(obj, message, status) {
    if (status) {
        if (!obj.isdone) {

            // Oluşturulacak tooltip nesnesi
            var d = document.createElement('div');

            // Tooltip mesaj nesnesi
            var t = document.createElement('div');

            // Container sınıf adını belirt
            d.className = 'tooltip-container';

            // Mesaj nesnesi sınıf adını belirt
            t.className = 'tooltip-message'

            // Mesajı nesneye yaz
            t.innerHTML = message;

            // Container nesnesine mesaj nesnesini ekle
            d.appendChild(t);

            // Container nesnesini, gelen objenin bulunduğu pozisyona ekle
            obj.parentNode.appendChild(d);

            // Tooltip mesajı sayfada gösterdiğimizi belirtiyoruz.
            // Tekrar gösterilmek istenirse, önce mevcut olanın kaldırılmasını istiyoruz
            // Değer true ise mevcut nesne hala ekranda demektir.
            obj.isdone = true;

            // 3 saniye sonra mesajı sayfadan sil
            setTimeout(function () {

                // Container'i sayfadan sil
                d.parentNode.removeChild(d);

                // Objeden de ilgili datayı sil
                delete obj.isdone;

            }, 3000);
        }
    }
}