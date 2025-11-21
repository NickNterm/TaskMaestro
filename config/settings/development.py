"""
Development settings for TaskMaestro project.
"""
import os
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True').lower() in ('true', '1', 'yes')

# Support both .env format and Docker environment variables
allowed_hosts_str = os.environ.get('DJANGO_ALLOWED_HOSTS') or os.environ.get('ALLOWED_HOSTS', '')
if allowed_hosts_str:
    ALLOWED_HOSTS = [host.strip() for host in allowed_hosts_str.split(',')]
else:
    ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1', '0.0.0.0'])

# In development, always allow 0.0.0.0 for Docker access
if '0.0.0.0' not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append('0.0.0.0')

# Development-specific settings
# Add django_extensions if available (optional development tool)
try:
    import django_extensions
    INSTALLED_APPS += ['django_extensions']
except ImportError:
    pass  # django_extensions not installed, skip it

# Disable caching in development (use dummy cache)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Use database-backed sessions in development (since we're using dummy cache)
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Allow all CORS origins in development (override in production)
CORS_ALLOW_ALL_ORIGINS = True

# Show SQL queries in development
if DEBUG:
    LOGGING['loggers']['django.db.backends'] = {
        'handlers': ['console'],
        'level': 'DEBUG',
        'propagate': False,
    }

