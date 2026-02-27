// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Redirect if cart is empty
    const cart = getCart();
    if (cart.length === 0) {
        window.location.href = 'shop.html';
        return;
    }

    renderCheckoutSummary(cart);

    // Toggle Credit Card form visibility based on selection
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById('card-details-box');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(e.target.value === 'card') {
                cardForm.style.display = 'block';
                // Make card fields required
                cardForm.querySelectorAll('input').forEach(input => input.required = true);
            } else {
                cardForm.style.display = 'none';
                // Remove required attribute if card is not selected
                cardForm.querySelectorAll('input').forEach(input => input.required = false);
            }
        });
    });

    // Handle Form Submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission

        // Simulate API call processing
        const btn = document.querySelector('.btn-checkout');
        const originalText = btn.innerText;
        btn.innerText = "Processing Securely...";
        btn.style.opacity = "0.7";
        btn.disabled = true;

        setTimeout(() => {
            // Clear cart from local storage
            localStorage.removeItem('urbanCart');
            
            // Redirect to success page
            window.location.href = 'order-success.html';
        }, 2000); // 2 seconds fake delay
    });

});

function renderCheckoutSummary(cart) {
    const itemsContainer = document.getElementById('checkout-items');
    let subtotal = 0;
    let html = '';

    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
        html += `
            <div class="checkout-item">
                <div class="check-item-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="check-item-img">
                    <span class="check-item-qty">${item.quantity}</span>
                </div>
                <div class="check-item-info">
                    <h4>${item.name}</h4>
                </div>
                <div class="check-item-price">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;

    const tax = subtotal * 0.18;
    const shipping = subtotal > 5000 ? 0 : 500;
    const grandTotal = subtotal + tax + shipping;

    document.getElementById('check-subtotal').innerText = formatCurrency(subtotal);
    document.getElementById('check-tax').innerText = formatCurrency(tax);
    document.getElementById('check-shipping').innerText = shipping === 0 ? 'Free' : formatCurrency(shipping);
    document.getElementById('check-total').innerText = formatCurrency(grandTotal);
}