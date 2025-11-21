# TaskMaestro

A production-ready Django REST Framework backend with Swagger documentation.

## Features

- ✅ Django 4.2 with Django REST Framework
- ✅ Environment-based configuration (.env file)
- ✅ Swagger/OpenAPI documentation (drf-spectacular)
- ✅ CORS support
- ✅ Production-ready settings structure
- ✅ Redis caching support
- ✅ Celery ready
- ✅ WhiteNoise for static files
- ✅ Comprehensive logging

## Quick Start

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration.

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

## API Documentation

Once the server is running, access the API documentation at:

- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

## Project Structure

```
TaskMaestro/
├── config/                 # Main project configuration
│   ├── settings/          # Settings split by environment
│   │   ├── base.py        # Base settings
│   │   ├── development.py # Development settings
│   │   └── production.py  # Production settings
│   ├── urls.py            # Main URL configuration
│   ├── wsgi.py            # WSGI configuration
│   └── asgi.py            # ASGI configuration
├── api/                    # API application
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   ├── urls.py            # API URLs
│   └── admin.py           # Admin configuration
├── .env                    # Environment variables (not in git)
├── .env.example            # Environment variables template
├── requirements.txt        # Python dependencies
├── manage.py               # Django management script
└── README.md              # This file
```

## Environment Variables

Key environment variables in `.env`:

- `SECRET_KEY`: Django secret key (change in production!)
- `DEBUG`: Debug mode (False in production)
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `DATABASE_URL`: Database connection string
- `CORS_ALLOWED_ORIGINS`: Allowed CORS origins
- `REDIS_URL`: Redis connection URL

## Running in Production

1. Set `DEBUG=False` in `.env`
2. Update `ALLOWED_HOSTS` with your domain
3. Use PostgreSQL (update `DATABASE_URL`)
4. Set security flags in `.env`:
   - `SECURE_SSL_REDIRECT=True`
   - `SESSION_COOKIE_SECURE=True`
   - `CSRF_COOKIE_SECURE=True`
5. Use production settings:
   ```bash
   export DJANGO_SETTINGS_MODULE=config.settings.production
   ```
6. Collect static files:
   ```bash
   python manage.py collectstatic
   ```
7. Run with Gunicorn:
   ```bash
   gunicorn config.wsgi:application
   ```

## Development

### Running Tests

```bash
pytest
```

### Creating Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## License

MIT
