// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();

    // Promo code logic
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
});

let discountPercentage = 0;

function renderCartPage() {
    const cart = getCart(); // From utils.js
    const cartContent = document.getElementById('cart-content');
    const cartEmpty = document.getElementById('cart-empty');
    const itemsContainer = document.getElementById('cart-items-container');

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    cartEmpty.style.display = 'none';
    cartContent.style.display = 'grid';

    let html = '';
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4><a href="product.html?id=${item.id}">${item.name}</a></h4>
                        <p>${formatCurrency(item.price)}</p>
                        <button class="remove-btn" onclick="removeItemFromCart(${item.id})">Remove</button>
                    </div>
                </div>
                
                <div class="cart-qty-ctrl">
                    <button onclick="updateItemQuantity(${item.id}, -1)"><i class="ph ph-minus"></i></button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button onclick="updateItemQuantity(${item.id}, 1)"><i class="ph ph-plus"></i></button>
                </div>
                
                <div class="cart-item-total">
                    ${formatCurrency(itemTotal)}
                </div>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;
    calculateTotals(cart);
}

window.updateItemQuantity = function(id, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        
        // If quantity drops to 0, remove item
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
            showToast('Item removed from cart');
        }
        
        localStorage.setItem('urbanCart', JSON.stringify(cart));
        updateCartBadge(); // Update global navbar badge
        renderCartPage();  // Re-render cart page
    }
};

window.removeItemFromCart = function(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('urbanCart', JSON.stringify(cart));
    updateCartBadge();
    showToast('Item removed from cart');
    renderCartPage();
};

function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Tax (18% GST)
    const tax = subtotal * 0.18;
    
    // Shipping: Free if subtotal > 5000, else 500
    const shipping = subtotal > 5000 ? 0 : 500;
    
    // Discount Calculation
    const discountAmount = subtotal * discountPercentage;
    
    // Grand Total
    const grandTotal = subtotal + tax + shipping - discountAmount;

    // Update DOM
    document.getElementById('summary-subtotal').innerText = formatCurrency(subtotal);
    document.getElementById('summary-tax').innerText = formatCurrency(tax);
    document.getElementById('summary-shipping').innerText = shipping === 0 ? 'Free' : formatCurrency(shipping);
    document.getElementById('summary-total').innerText = formatCurrency(grandTotal);
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');
    const code = promoInput.value.trim().toUpperCase();

    if (code === 'GOLDEN20') {
        discountPercentage = 0.20; // 20% discount
        promoMessage.innerText = 'Promo code applied! 20% off.';
        promoMessage.style.color = '#27ae60';
        promoMessage.style.display = 'block';
    } else if (code !== '') {
        discountPercentage = 0;
        promoMessage.innerText = 'Invalid promo code.';
        promoMessage.style.color = 'red';
        promoMessage.style.display = 'block';
    }

    // Re-calculate totals with new discount
    const cart = getCart();
    calculateTotals(cart);
}