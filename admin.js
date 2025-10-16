document.addEventListener('DOMContentLoaded', () => {
    // Global state to hold menu items
    let menuItems = [];

    // DOM Elements
    const itemList = document.getElementById('menu-item-list');
    const form = document.getElementById('menu-form');
    const itemIdInput = document.getElementById('item-id');
    const itemNameInput = document.getElementById('item-name');
    const itemPriceInput = document.getElementById('item-price');
    const itemDescriptionInput = document.getElementById('item-description');
    const itemImageInput = document.getElementById('item-image');
    const jsonOutput = document.getElementById('json-output');
    const clearFormBtn = document.getElementById('clear-form-btn');

    // --- Core Functions ---

    /**
     * Fetches menu data from menu.json and initializes the panel.
     */
    async function loadInitialData() {
        try {
            const response = await fetch('menu.json');
            if (!response.ok) {
                // If menu.json doesn't exist, start with an empty array
                if (response.status === 404) {
                    console.warn('menu.json bulunamadı. Boş bir menü ile başlanıyor.');
                    menuItems = [];
                } else {
                    throw new Error(`HTTP hatası! Durum: ${response.status}`);
                }
            } else {
                menuItems = await response.json();
            }
            renderItemList();
            updateJsonOutput();
        } catch (error) {
            console.error('Menü verisi yüklenirken hata:', error);
            alert('Menü verileri yüklenemedi. Lütfen konsolu kontrol edin.');
        }
    }

    /**
     * Renders the list of menu items on the page.
     */
    function renderItemList() {
        itemList.innerHTML = ''; // Clear existing list
        menuItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${item.name}</strong> - ${item.price}</span>
                <div class="button-group">
                    <button class="edit-btn" data-id="${item.id}">Düzenle</button>
                    <button class="delete-btn" data-id="${item.id}">Sil</button>
                </div>
            `;
            itemList.appendChild(li);
        });
    }

    /**
     * Updates the JSON output textarea with the current menu data.
     */
    function updateJsonOutput() {
        jsonOutput.textContent = JSON.stringify(menuItems, null, 2);
    }

    /**
     * Resets the form to its initial state.
     */
    function clearForm() {
        form.reset();
        itemIdInput.value = '';
    }

    // --- Event Handlers ---

    /**
     * Handles the form submission for adding or updating an item.
     */
    function handleFormSubmit(event) {
        event.preventDefault();

        const itemData = {
            name: itemNameInput.value.trim(),
            price: itemPriceInput.value.trim(),
            description: itemDescriptionInput.value.trim(),
            image: itemImageInput.value.trim()
        };

        const existingId = parseInt(itemIdInput.value, 10);

        if (existingId) {
            // Update existing item
            const index = menuItems.findIndex(item => item.id === existingId);
            if (index > -1) {
                menuItems[index] = { ...menuItems[index], ...itemData };
            }
        } else {
            // Add new item
            const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
            menuItems.push({ id: newId, ...itemData });
        }

        renderItemList();
        updateJsonOutput();
        clearForm();
    }

    /**
     * Handles clicks on the "Edit" and "Delete" buttons.
     */
    function handleItemListClick(event) {
        const target = event.target;
        const id = parseInt(target.getAttribute('data-id'), 10);

        if (target.classList.contains('edit-btn')) {
            const itemToEdit = menuItems.find(item => item.id === id);
            if (itemToEdit) {
                itemIdInput.value = itemToEdit.id;
                itemNameInput.value = itemToEdit.name;
                itemPriceInput.value = itemToEdit.price;
                itemDescriptionInput.value = itemToEdit.description;
                itemImageInput.value = itemToEdit.image;
                form.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (target.classList.contains('delete-btn')) {
            if (confirm(`'${menuItems.find(item => item.id === id).name}' ürününü silmek istediğinizden emin misiniz?`)) {
                menuItems = menuItems.filter(item => item.id !== id);
                renderItemList();
                updateJsonOutput();
                clearForm();
            }
        }
    }

    // --- Event Listeners ---
    form.addEventListener('submit', handleFormSubmit);
    itemList.addEventListener('click', handleItemListClick);
    clearFormBtn.addEventListener('click', clearForm);

    // --- Initial Load ---
    loadInitialData();
});