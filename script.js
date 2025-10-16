function siparisVer(urunAdi) {
    // !!! EN ÖNEMLİ KISIM !!!
    // Kendi WhatsApp numaranı ülke koduyla birlikte '90' ile başlayarak yaz.
    const telefonNumarasi = "905332761100";

    const mesaj = `Merhaba, "${urunAdi}" siparişi vermek istiyorum.`;

    const whatsappURL = `https://wa.me/${telefonNumarasi}?text=${encodeURIComponent(mesaj)}`;

    window.open(whatsappURL, '_blank');
}