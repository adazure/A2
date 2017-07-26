var fsgallery = (function(config) {

    var currentIndex = -1;
    var currentItem = null;
    var zIndex = 100;
    var fsgStatus = false;
    var elements = {};
    var showItems = [];

    function check(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    function prevEvent(e) {
        if (currentIndex < config.images.length - 1)
            currentIndex++;
        else
            currentIndex = 0;
        show(currentIndex);
    }

    function nextEvent(e) {
        if (currentIndex > 0)
            currentIndex--;
        else
            currentIndex = config.images.length - 1;

        show(currentIndex);
    }

    function create() {
        elements.shadow = document.createElement('div');
        elements.prev = document.createElement('div');
        elements.next = document.createElement('div');
        elements.shadow.id = 'fsg-shadow';
        elements.prev.id = 'fsg-prev';
        elements.prev.className = elements.next.className = 'fsg-arrow';
        elements.next.id = 'fsg-next';
        elements.prev.addEventListener('click', prevEvent);
        elements.next.addEventListener('click', nextEvent);
        elements.shadow.addEventListener('click', hide, false);
        fsgStatus = true;
        appendItem(document.body, elements.shadow, elements.next, elements.prev);
    }

    function show(index) {

        if (!fsgStatus) create();
        remove(function() {
            if (check(config.images[index])) {

                var container = document.createElement('div');
                document.body.appendChild(container);
                container.className = 'fsg-item';
                container.style.zIndex = zIndex;
                var image = new Image();
                image.src = config.images[index].getAttribute('data-fullscreen');
                container.appendChild(image);
                zIndex++;
                currentIndex = index;
                currentItem = container;
                currentItem.addEventListener('click', hide, false);
                showItems.push(container);
            }
        });

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
        remove(function() {
            currentIndex = -1;
            currentItem = null;
            fsgStatus = false;
        });
    }

    function remove(action) {
        if (currentItem)
            currentItem.parentNode.removeChild(currentItem);
        action();
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