// --- AYARLAR ---
// WhatsApp siparişleri için kullanılacak telefon numarasını bu alana girin.
// Numaranın başında ülke kodu olmalı ve boşluk veya özel karakter içermemelidir.
// Örnek: "905331234567"
const WHATSAPP_TELEFON_NUMARASI = "905332761100";
// --- AYARLAR SONU ---


/**
 * Belirtilen ürünü WhatsApp üzerinden sipariş vermek için bir URL oluşturur ve yeni sekmede açar.
 * @param {string} urunAdi - Sipariş edilecek ürünün adı.
 */
function siparisVer(urunAdi) {
    // Mesaj içeriğini oluştur
    const mesaj = `Merhaba, "${urunAdi}" siparişi vermek istiyorum.`;

    // WhatsApp için özel URL'yi oluştur
    const whatsappURL = `https://wa.me/${WHATSAPP_TELEFON_NUMARASI}?text=${encodeURIComponent(mesaj)}`;

    // Oluşturulan URL'yi yeni bir sekmede aç
    window.open(whatsappURL, '_blank');
}