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