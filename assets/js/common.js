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
var fsgallery = (function(config) {

    var currentIndex = -1;
    var currentItem = null;
    var zIndex = 100;
    var fsgStatus = false;
    var elements = {};

    function check(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    function create() {
        elements.shadow = document.createElement('div');
        elements.prev = document.createElement('div');
        elements.next = document.createElement('div');
        elements.shadow.id = 'fsg-shadow';
        elements.prev.id = 'fsg-prev';
        elements.prev.className = elements.next.className = 'fsg-arrow';
        elements.next.id = 'fsg-next';

        fsgStatus = true;
        appendItem(document.body, elements.shadow, elements.next, elements.prev);
    }

    function show(index) {

        if (!fsgStatus) create();

        remove();

        var container = document.createElement('div');
        container.className = 'fsg-item';
        container.style.zIndex = zIndex;
        if (check(config.images[index])) {
            var image = new Image();
            image.src = config.images[index].getAttribute('data-fullscreen');
            container.appendChild(image);
            zIndex++;
            currentIndex = index;
            currentItem = container;
            document.body.appendChild(container);
            currentItem.addEventListener('click', hide, false);
            return container;
        }

    }

    function removeItem() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i])
                arguments[i].parentNode.removeChild(arguments[i])
        }
    }

    function appendItem(root) {
        var k = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < k.length; i++) {
            root.appendChild(k[i]);
        }
    }

    function hide() {
        removeItem(elements.shadow, elements.prev, elements.next);
        remove(currentIndex, currentItem);
        currentIndex = -1;
        currentItem = null;
        fsgStatus = false;
    }

    function remove(i, z) {
        z.className = 'fsg-item fsg-removed';
        setTimeout(function() { z.parentNode.removeChild(z); }, config.removeTimer);
    }

    function start(args) {
        config.images = document.querySelectorAll(args.data);
        if (config.images) {
            for (var a = 0, b = config.images; a < b.length; a++) {
                b[a].index = a;
                b[a].addEventListener('click', function() {
                    show(this.index);
                }, false);
            }
        }
        config.removeTimer = args.removeTimer || 200;
    }

    function next() {
        if (currentIndex < config.images.length) {
            currentIndex++;
            show(currentIndex);
        }

        showHideArrow();
    }

    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            show(currentIndex);
        }
        showHideArrow();
    }

    function showHideArrow() {
        if (elements.prev)
            elements.prev.style.display = currentIndex <= 0 ? 'none' : 'block';

        if (elements.next)
            elements.next.style.display = currentIndex >= config.images.length - 1
    }


    return { init: start, next: next, prev: prev, hide: hide, show: show };
})({});
(function(config) {

    window.addEventListener('load', function() {

        config.containers = document.getElementsByClassName('slide-container');

        function template(data) {
            var self = this;
            self.status = true;
            self.container = data;
            self.template = data.children[0];
            self.items = self.template.children;
            self.options = { startIndex: 0, timer: 3000 };
            self.position = { left: false, right: false };
            self.dotContainer = document.createElement('div');
            self.dotContainer.className = 'slide-container-dots';
            self.container.appendChild(self.dotContainer);

            self.eventnames = {
                click: ['click', 'touchend'],
                mousedown: ['mousedown', 'touchstart'],
                mouseup: ['mouseup', 'touchend'],
                mousemove: ['mousemove', 'touchmove']
            }

            self.bind = function(obj, name, action) {

                function sets(a) {
                    if (obj.addEventListener)
                        obj.addEventListener(a, action);
                    else
                        obj.attachEvent('on' + a, action);
                }
                for (var i = 0; i < self.eventnames[name].length; i++)
                    sets(self.eventnames[name][i]);
            }

            self.add = function(n, i) {
                var dot = document.createElement('span');
                self.bind(dot, 'click', function() {
                    self.options.startIndex = i;
                    self.selectedItem();
                });
                self.dotContainer.appendChild(dot);
            }

            self.selectedItem = function() {
                for (var i = 0, u = self.dotContainer.children; i < u.length; i++) {
                    u[i].className = '';
                }

                u[self.options.startIndex].className = 'active';
                self.template.style.left = -(self.options.startIndex * self.container.clientWidth) + 'px';
                self.watch();
            }


            for (var i = 0; i < self.items.length; i++) {
                self.add(self.items[i], i);
            }

            self.getPosition = function(e) {
                var result = { pageX: 0, pageY: 0 };
                result.pageX = e.touches ? e.touches[0].pageX : e.pageX;
                result.pageY = e.touches ? e.touches[0].pageY : e.pageY;
                return result;
            }

            self.bind(self.container, 'mousedown', function(e) {
                var x = self.getPosition(e).pageX;
                self.position = { leftX: x, x: x - self.template.offsetLeft };
                self.template.classList.add('handle');
                e.preventDefault();
                self.status = false;
                return;
            });

            self.bind(self.container, 'mousemove', function(e) {
                e.preventDefault();
                if (!self.status) {
                    var x = self.getPosition(e).pageX;
                    self.position.left = self.position.leftX > x;
                    self.position.right = self.position.leftX < x;
                    var min = (self.template.children.length * self.container.offsetWidth) - self.container.offsetWidth;
                    self.position.current = x - self.container.offsetLeft - self.position.x;
                    if (self.position.current > 0)
                        self.position.current = 0;
                    else if (self.position.current < -min)
                        self.position.current = -min;
                    self.template.style.left = self.position.current + 'px';
                }
                return false;
            });
            self.bind(window, 'mouseup', function() {
                self.template.classList.remove('handle');
                if (self.position.left) {
                    self.options.startIndex++;
                    self.checkPosition();
                    self.selectedItem();
                } else if (self.position.right) {
                    self.options.startIndex--;
                    self.checkPosition();
                    self.selectedItem();
                }

                self.status = true;
                self.watch();

                self.position.left = self.position.right = false;
            });

            self.checkPosition = function() {
                if (self.options.startIndex > self.items.length - 1)
                    self.options.startIndex = self.items.length - 1;

                if (self.options.startIndex < 0)
                    self.options.startIndex = 0;
            }
            var time = 0;
            self.watch = function() {
                clearTimeout(time);
                time = setTimeout(function() {
                    if (self.status) {

                        if (self.options.startIndex < self.items.length - 1) {
                            self.options.startIndex++;
                        } else
                            self.options.startIndex = 0;

                        self.selectedItem(self.options.startIndex);

                    }
                }, self.options.timer);
            }
            self.selectedItem(self.options.startIndex);

        }

        (function(a) {
            for (var n = 0; n < a.length; n++) {
                var t = new template(a[n]);
            }
        })(config.containers);

    });
})({});
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