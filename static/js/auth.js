// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';
        
        try {
            const response = await apiRequest(`${AUTH_BASE_URL}/login/`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const data = await response.json();
                TokenManager.setTokens(data.access, data.refresh);
                showToast('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = '/dashboard/';
                }, 500);
            } else {
                const error = await response.json();
                showToast(error.detail || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('reg-password').value;
        const passwordConfirm = document.getElementById('reg-password-confirm').value;
        
        if (password !== passwordConfirm) {
            showToast('Passwords do not match!', 'error');
            return;
        }
        
        const formData = {
            username: document.getElementById('reg-username').value,
            email: document.getElementById('reg-email').value || '',
            password: password,
            password_confirm: passwordConfirm
        };
        
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        
        try {
            const response = await apiRequest(`${AUTH_BASE_URL}/register/`, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const data = await response.json();
                TokenManager.setTokens(data.tokens.access, data.tokens.refresh);
                showToast('Registration successful!', 'success');
                setTimeout(() => {
                    window.location.href = '/dashboard/';
                }, 500);
            } else {
                const error = await response.json();
                const errorMsg = error.username?.[0] || error.password?.[0] || error.detail || 'Registration failed.';
                showToast(errorMsg, 'error');
            }
        } catch (error) {
            showToast('An error occurred. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Register';
        }
    });
}

// Logout Handler
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        // Remove existing listeners
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        
        newLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            TokenManager.clearTokens();
            showToast('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = '/login/';
            }, 500);
        });
    }
}

// Setup logout when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLogout);
} else {
    setupLogout();
}

// Check authentication on page load (only for dashboard)
if (window.location.pathname === '/dashboard/' || window.location.pathname === '/') {
    if (!TokenManager.isAuthenticated()) {
        window.location.href = '/login/';
    } else {
        // Show navbar if authenticated
        const navbar = document.getElementById('mainNavbar');
        if (navbar) navbar.style.display = 'block';
    }
}

