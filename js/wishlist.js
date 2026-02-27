// js/wishlist.js

document.addEventListener('DOMContentLoaded', () => {
    window.renderWishlist();
});

// Main function to display saved items
window.renderWishlist = function() {
    const wishlistContainer = document.getElementById('wishlist-grid');
    const emptyState = document.getElementById('wishlist-empty');
    
    if (!wishlistContainer) return;

    // Get IDs from localStorage
    const wishlistIds = JSON.parse(localStorage.getItem('urbanWishlist')) || [];

    if (wishlistIds.length === 0) {
        wishlistContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    wishlistContainer.style.display = 'grid';

    let html = '';
    // Reverse array to show newly added items first
    [...wishlistIds].reverse().forEach(id => {
        const product = getProductById(id);
        if(product) {
            html += window.createProductCard(product); // Reuse card function from main.js
        }
    });
    
    wishlistContainer.innerHTML = html;

    // Trigger animations for loaded cards
    if (typeof window.initScrollAnimations === 'function') {
        setTimeout(window.initScrollAnimations, 100);
    }
};