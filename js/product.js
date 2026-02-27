// js/product.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Get ID from URL, if it doesn't exist, default to 1 so the page doesn't break
    let productId = getQueryParam('id');
    if (!productId) {
        productId = 1; 
    }

    const productContainer = document.getElementById('product-container');
    const errorContainer = document.getElementById('product-error');
    
    // Fetch Product
    const product = getProductById(productId);

    if (!product) {
        productContainer.style.display = 'none';
        errorContainer.style.display = 'block';
        return;
    }

    // Populate Data
    document.title = `${product.name} | UrbanGifts`;
    document.getElementById('bread-current').innerText = product.name;
    document.getElementById('bread-category').innerText = product.category;
    document.getElementById('bread-category').href = `shop.html?category=${product.category}`;

    document.getElementById('prod-title').innerText = product.name;
    document.getElementById('prod-price').innerText = formatCurrency(product.price);
    document.getElementById('prod-desc').innerText = product.description;
    document.getElementById('prod-material').innerText = product.material;
    document.getElementById('prod-rating').innerText = `(${product.reviews} Reviews)`;

    // Handle Images
    const mainImg = document.getElementById('main-product-img');
    mainImg.src = product.image;

    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    const thumbContainer = document.getElementById('thumbnail-container');
    
    if (images.length > 1) {
        let thumbHtml = '';
        images.forEach((imgSrc, index) => {
            const activeClass = index === 0 ? 'active' : '';
            thumbHtml += `<div class="thumb-box ${activeClass}" onclick="changeMainImage('${imgSrc}', this)"><img src="${imgSrc}" alt="Thumbnail"></div>`;
        });
        thumbContainer.innerHTML = thumbHtml;
    }

    // Handle Wishlist State for this specific product
    const wishlistBtn = document.getElementById('wishlist-main');
    const icon = wishlistBtn.querySelector('i');
    let wishlist = JSON.parse(localStorage.getItem('urbanWishlist')) || [];
    
    if (wishlist.includes(product.id)) {
        icon.classList.replace('ph', 'ph-fill');
        icon.style.color = 'var(--color-gold)';
    }

    wishlistBtn.addEventListener('click', () => {
        window.toggleWishlist(product.id, wishlistBtn);
    });

    // Handle Quantity Selector
    const qtyInput = document.getElementById('qty-input');
    document.getElementById('qty-minus').addEventListener('click', () => {
        if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        if (qtyInput.value < product.stock) qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    // Handle Add to Cart
    document.getElementById('add-to-cart-main').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        let cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty
            });
        }

        localStorage.setItem('urbanCart', JSON.stringify(cart));
        updateCartBadge();
        showToast(`${qty} x ${product.name} added to cart!`);
    });

    // Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const accIcon = this.querySelector('i');
            if(this.classList.contains('active')){
                accIcon.classList.replace('ph-caret-down', 'ph-caret-up');
            } else {
                accIcon.classList.replace('ph-caret-up', 'ph-caret-down');
            }
        });
    });

    // Load Related Products
    loadRelatedProducts(product.category, product.id);
});

// Function to change main image when thumbnail is clicked
window.changeMainImage = function(src, element) {
    document.getElementById('main-product-img').src = src;
    document.querySelectorAll('.thumb-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');
};

function loadRelatedProducts(category, currentId) {
    const allProducts = getProducts();
    const related = allProducts.filter(p => p.category === category && p.id !== currentId).slice(0, 4);
    
    if (related.length > 0) {
        document.getElementById('related-section').style.display = 'block';
        const grid = document.getElementById('related-grid');
        let html = '';
        related.forEach(p => {
            html += window.createProductCard(p); 
        });
        grid.innerHTML = html;
        if (typeof window.initScrollAnimations === 'function') setTimeout(window.initScrollAnimations, 100);
    }
}