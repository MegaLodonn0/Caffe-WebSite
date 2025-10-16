// --- AYARLAR ---
const WHATSAPP_TELEFON_NUMARASI = "905332761100";
// --- AYARLAR SONU ---

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
});

async function loadMenu() {
    try {
        const response = await fetch('menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const menuItems = await response.json();
        const menuContainer = document.getElementById('menu-container');

        if (!menuContainer) {
            console.error('Hata: "menu-container" ID\'li element bulunamadı.');
            return;
        }

        menuContainer.innerHTML = ''; // Mevcut içeriği temizle

        menuItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menu-item');

            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
                <p class="description">${item.description}</p>
                <button onclick="siparisVer('${item.name}')">WhatsApp'tan Sipariş Ver</button>
            `;

            menuContainer.appendChild(menuItemElement);
        });

    } catch (error) {
        console.error('Menü yüklenirken bir hata oluştu:', error);
        const menuContainer = document.getElementById('menu-container');
        if (menuContainer) {
            menuContainer.innerHTML = '<p>Menü yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>';
        }
    }
}

function siparisVer(urunAdi) {
    const mesaj = `Merhaba, "${urunAdi}" siparişi vermek istiyorum.`;
    const whatsappURL = `https://wa.me/${WHATSAPP_TELEFON_NUMARASI}?text=${encodeURIComponent(mesaj)}`;
    window.open(whatsappURL, '_blank');
}