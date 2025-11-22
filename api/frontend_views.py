"""
Frontend Views - Serve HTML templates
"""
from django.shortcuts import render
from django.views.decorators.cache import never_cache


@never_cache
def login_view(request):
    """Login page"""
    return render(request, 'auth/login.html')


@never_cache
def register_view(request):
    """Registration page"""
    return render(request, 'auth/register.html')


@never_cache
def dashboard_view(request):
    """Dashboard page - JWT authentication handled by frontend"""
    return render(request, 'tasks/dashboard.html')

