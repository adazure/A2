function showTooltip(obj, message, status) {
    if (status) {
        if (!obj.isdone) {
            var d = document.createElement('div');
            var t = document.createElement('div');
            d.className = 'tooltip-container';
            t.className = 'tooltip-message'
            t.innerHTML = message;
            d.appendChild(t);
            obj.parentNode.appendChild(d);
            obj.isdone = true;
            setTimeout(function () {
                d.parentNode.removeChild(d);
                delete obj.isdone;
            }, 3000);
        }
    }
}

// Contact
(function () {

    var contactForm = document.getElementsByTagName('form')[0];
    var sendButton = document.getElementById('sendbutton');

    function postEvent(e) {
        e.preventDefault();

        var name = document.getElementById('name'),
            email = document.getElementById('email'),
            gsm = document.getElementById('gsm'),
            message = document.getElementById('message');

        var result = !(!name.value || !email.value || !message.value);


        showTooltip(name, name.getAttribute('data-err'), !name.value);
        showTooltip(email, email.getAttribute('data-err'), !email.value);
        showTooltip(message, message.getAttribute('data-err'), !message.value);


        return result;
    }

    contactForm.addEventListener('submit', postEvent);

})();