// js/shop.js

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('shop-product-grid')) return;

    let allProducts = getProducts();
    let filteredProducts = [...allProducts];

    const gridContainer = document.getElementById('shop-product-grid');
    const productCountEl = document.getElementById('product-count');
    const noProductsMsg = document.getElementById('no-products-msg');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const clearFiltersBtn = document.getElementById('clear-filters');

    renderFilterCheckboxes('category-filters', 'category');
    renderFilterCheckboxes('material-filters', 'material');

    const urlCategory = getQueryParam('category');
    if (urlCategory && urlCategory !== 'all') {
        const checkbox = document.querySelector(`input[value="${urlCategory}"]`);
        if (checkbox) checkbox.checked = true;
    }

    applyFiltersAndSort();

    searchInput.addEventListener('input', applyFiltersAndSort);
    sortSelect.addEventListener('change', applyFiltersAndSort);
    document.querySelectorAll('.filter-checkbox').forEach(cb => { cb.addEventListener('change', applyFiltersAndSort); });
    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        sortSelect.value = 'featured';
        applyFiltersAndSort();
    });

    function renderFilterCheckboxes(containerId, property) {
        const container = document.getElementById(containerId);
        const uniqueValues = [...new Set(allProducts.map(p => p[property]))].filter(Boolean);
        let html = '';
        uniqueValues.forEach(val => {
            html += `<label class="checkbox-item"><input type="checkbox" class="filter-checkbox" data-type="${property}" value="${val}"> ${val}</label>`;
        });
        container.innerHTML = html;
    }

    function applyFiltersAndSort() {
        const searchTerm = searchInput.value.toLowerCase();
        const checkedCategories = Array.from(document.querySelectorAll('input[data-type="category"]:checked')).map(cb => cb.value);
        const checkedMaterials = Array.from(document.querySelectorAll('input[data-type="material"]:checked')).map(cb => cb.value);

        filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);
            const matchesMaterial = checkedMaterials.length === 0 || checkedMaterials.includes(product.material);
            return matchesSearch && matchesCategory && matchesMaterial;
        });

        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
        else if (sortValue === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);
        else if (sortValue === 'newest') filteredProducts.sort((a, b) => b.id - a.id);

        renderGrid();
    }

    function renderGrid() {
        productCountEl.innerText = `Showing ${filteredProducts.length} results`;
        if (filteredProducts.length === 0) {
            gridContainer.innerHTML = '';
            gridContainer.style.display = 'none';
            noProductsMsg.style.display = 'block';
            return;
        }
        gridContainer.style.display = 'grid';
        noProductsMsg.style.display = 'none';
        let html = '';
        filteredProducts.forEach(product => { html += window.createProductCard(product); });
        gridContainer.innerHTML = html;
        if (typeof window.initScrollAnimations === 'function') setTimeout(window.initScrollAnimations, 100);
    }
});