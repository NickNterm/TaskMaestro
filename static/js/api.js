// API Configuration
const API_BASE_URL = '/api';
const AUTH_BASE_URL = '/api/auth';

// Token Management
const TokenManager = {
    getAccessToken() {
        return localStorage.getItem('access_token');
    },
    
    getRefreshToken() {
        return localStorage.getItem('refresh_token');
    },
    
    setTokens(access, refresh) {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    },
    
    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },
    
    isAuthenticated() {
        return !!this.getAccessToken();
    }
};

// API Request Helper
async function apiRequest(url, options = {}) {
    const token = TokenManager.getAccessToken();
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    
    try {
        let response = await fetch(url, config);
        
        // Handle token refresh on 401
        if (response.status === 401 && token) {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
                config.headers['Authorization'] = `Bearer ${TokenManager.getAccessToken()}`;
                response = await fetch(url, config);
                if (response.status === 401) {
                    // Still 401 after refresh, clear tokens
                    TokenManager.clearTokens();
                    if (window.location.pathname !== '/login/' && window.location.pathname !== '/register/') {
                        window.location.href = '/login/';
                    }
                    throw new Error('Authentication failed');
                }
            } else {
                TokenManager.clearTokens();
                if (window.location.pathname !== '/login/' && window.location.pathname !== '/register/') {
                    window.location.href = '/login/';
                }
                throw new Error('Authentication failed');
            }
        }
        
        return response;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// Refresh Access Token
async function refreshAccessToken() {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) return false;
    
    try {
        const response = await fetch(`${AUTH_BASE_URL}/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken })
        });
        
        if (response.ok) {
            const data = await response.json();
            TokenManager.setTokens(data.access, refreshToken);
            return true;
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
    
    return false;
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format Date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Format DateTime
function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

