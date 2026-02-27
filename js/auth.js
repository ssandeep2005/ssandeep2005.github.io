// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // --- Signup Logic ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            // Save user to localStorage
            const user = { name, email, password };
            localStorage.setItem('urbanUser', JSON.stringify(user));
            
            showToast('Account created! Redirecting to login...');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // --- Login Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const savedUser = JSON.parse(localStorage.getItem('urbanUser'));

            if (savedUser && savedUser.email === email && savedUser.password === password) {
                // Set logged in state
                localStorage.setItem('urbanLoggedIn', 'true');
                showToast(`Welcome back, ${savedUser.name}!`);
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showToast('Invalid email or password!');
            }
        });
    }

    // --- Global Check (Can be added to main.js as well later) ---
    // Change profile icon behavior if logged in
    const isLoggedIn = localStorage.getItem('urbanLoggedIn') === 'true';
    const profileIcons = document.querySelectorAll('a[href="login.html"]');
    
    if (isLoggedIn && profileIcons.length > 0) {
        profileIcons.forEach(icon => {
            // Change link to simulate a logout action or profile page
            icon.href = "#";
            // Replace icon visually to show filled user
            icon.innerHTML = '<i class="ph-fill ph-user" style="color: var(--color-gold);"></i>';
            icon.title = "Logout";
            
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                if(confirm("Do you want to log out?")) {
                    localStorage.removeItem('urbanLoggedIn');
                    window.location.reload();
                }
            });
        });
    }
});