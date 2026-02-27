// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Global UI Elements
    updateCartBadge();
    initDarkMode();
    initMobileMenu();
    initScrollAnimations();

    // 2. Load Homepage Dynamic Data (Only if we are on homepage)
    const bestsellerGrid = document.getElementById('bestseller-grid');
    if (bestsellerGrid) {
        loadHomepageProducts();
    }
});

// --- Dark Mode Toggle ---
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const isDark = localStorage.getItem('urbanDarkMode') === 'true';
    
    if (isDark) {
        document.body.classList.add('dark-mode');
        if(themeToggle) themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const currentlyDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('urbanDarkMode', currentlyDark);
            themeToggle.innerHTML = currentlyDark ? '<i class="ph ph-sun"></i>' : '<i class="ph ph-moon"></i>';
        });
    }
}

// --- Mobile Hamburger Menu ---
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navList = document.getElementById('nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('show-menu');
        });
    }
}

// --- Scroll Animations (Fixed to be globally accessible) ---
window.initScrollAnimations = function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
};

// --- Load Dynamic Products into Homepage ---
function loadHomepageProducts() {
    // We assume data.js is loaded before main.js
    if (typeof getBestSellers !== 'function') return;

    const bestSellers = getBestSellers(); // Fetches from data.js
    const bestsellerGrid = document.getElementById('bestseller-grid');
    
    if (bestsellerGrid && bestSellers.length > 0) {
        let html = '';
        // Only show first 4 bestsellers on homepage
        bestSellers.slice(0, 4).forEach(product => {
            html += window.createProductCard(product);
        });
        bestsellerGrid.innerHTML = html;
        
        // Trigger animations for the newly added products
        setTimeout(window.initScrollAnimations, 100);
    }
}

// --- Reusable HTML generator for Product Cards (UPDATED WITH WISHLIST) ---
window.createProductCard = function(product) {
    const badgeHtml = product.isNew ? `<span class="product-badge">New</span>` : '';
    
    // Check if product is already in wishlist
    const wishlist = JSON.parse(localStorage.getItem('urbanWishlist')) || [];
    const isWished = wishlist.includes(product.id);
    const heartClass = isWished ? 'ph-fill' : 'ph';
    const heartColor = isWished ? 'color: var(--color-gold);' : '';

    return `
        <div class="product-card animate-on-scroll fade-up">
            <div class="product-image-wrapper">
                <a href="product.html?id=${product.id}" class="product-image image-zoom-container">
                    ${badgeHtml}
                    <img src="${product.image}" alt="${product.name}" class="zoom-img" loading="lazy">
                </a>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id}, this)" aria-label="Add to Wishlist">
                    <i class="${heartClass} ph-heart" style="${heartColor}"></i>
                </button>
            </div>
            <div class="product-info">
                <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <p>${formatCurrency(product.price)}</p>
                <button class="add-to-cart-btn" onclick="addToCartFast(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
};

// --- NEW: Global Wishlist Toggle Function ---
window.toggleWishlist = function(productId, btnElement) {
    let wishlist = JSON.parse(localStorage.getItem('urbanWishlist')) || [];
    const icon = btnElement.querySelector('i');

    if (wishlist.includes(productId)) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        icon.classList.remove('ph-fill');
        icon.classList.add('ph');
        icon.style.color = 'var(--color-gray)';
        showToast('Removed from Wishlist');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        icon.classList.remove('ph');
        icon.classList.add('ph-fill');
        icon.style.color = 'var(--color-gold)';
        showToast('Added to Wishlist');
    }

    localStorage.setItem('urbanWishlist', JSON.stringify(wishlist));

    // MAGIC TRICK: If we are on the wishlist page, refresh the grid instantly!
    if (typeof window.renderWishlist === 'function') {
        setTimeout(window.renderWishlist, 300);
    }
};

// --- Quick Add to Cart function for Homepage cards ---
window.addToCartFast = function(productId) {
    const product = getProductById(productId);
    if (!product) return;

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('urbanCart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`${product.name} added to cart!`);
};