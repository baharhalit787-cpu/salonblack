const form = document.getElementById("randevuForm");
const tarih = document.getElementById("tarih");
const saat = document.getElementById("saat");


// Bugünden önce tarih seçilmesini engelle
const bugun = new Date();

const yil = bugun.getFullYear();
const ay = String(bugun.getMonth() + 1).padStart(2, "0");
const gun = String(bugun.getDate()).padStart(2, "0");

tarih.min = `${yil}-${ay}-${gun}`;


// Pazar günü seçilmesini engelle
tarih.addEventListener("change", function () {

    const secilenTarih = new Date(this.value + "T00:00:00");

    if (secilenTarih.getDay() === 0) {
        alert("Pazar günü kapalıyız. Lütfen başka bir gün seçin.");
        this.value = "";
    }

});


// Randevu gönderme
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const ad = document.getElementById("ad").value.trim();
    const telefon = document.getElementById("telefon").value.trim();
    const hizmet = document.getElementById("hizmet").value;
    const secilenTarih = tarih.value;
    const secilenSaat = saat.value;
    const not = document.getElementById("not").value.trim();


    if (!ad || !telefon || !hizmet || !secilenTarih || !secilenSaat) {
        alert("Lütfen gerekli alanların tamamını doldurun.");
        return;
    }


    // Saat kontrolü
    if (secilenSaat < "10:00" || secilenSaat > "22:00") {
        alert("Randevu saatleri 10:00 - 22:00 arasındadır.");
        return;
    }


    // Tarihi Türkçe biçime çevir
    const tarihObjesi = new Date(secilenTarih + "T00:00:00");

    const turkceTarih = tarihObjesi.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });


    let mesaj =
        "SALON BLACK RANDEVU%n%n" +
        "Ad Soyad: " + ad + "%n" +
        "Telefon: " + telefon + "%n" +
        "Hizmet: " + hizmet + "%n" +
        "Tarih: " + turkceTarih + "%n" +
        "Saat: " + secilenSaat;


    if (not) {
        mesaj += "%nNot: " + not;
    }


    const whatsappNumarasi = "905394025998";

    const whatsappLink =
        "https://wa.me/" +
        whatsappNumarasi +
        "?text=" +
        encodeURIComponent(mesaj.replaceAll("%n", "\n"));


    window.open(whatsappLink, "_blank");

});