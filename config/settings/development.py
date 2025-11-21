"""
Development settings for TaskMaestro project.
"""
from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

# Development-specific settings
INSTALLED_APPS += [
    'django_extensions',  # Optional: for better development tools
]

# Disable caching in development (use dummy cache)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Allow all CORS origins in development (override in production)
CORS_ALLOW_ALL_ORIGINS = True

# Show SQL queries in development
if DEBUG:
    LOGGING['loggers']['django.db.backends'] = {
        'handlers': ['console'],
        'level': 'DEBUG',
        'propagate': False,
    }

