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
        if (!z) return;
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