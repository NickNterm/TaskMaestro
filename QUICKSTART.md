# Quick Start Guide

## Initial Setup

1. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run server:**
   ```bash
   python manage.py runserver
   ```

## Or use the setup script:

```bash
./setup.sh
```

## Access Points

- **API Base**: http://localhost:8000/api/
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/
- **Admin Panel**: http://localhost:8000/admin/
- **Health Check**: http://localhost:8000/api/health/

## Common Commands

```bash
# Make migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
pytest

# Collect static files (production)
python manage.py collectstatic

# Run with Makefile
make install
make migrate
make run
make test
```

## Adding New Models/Endpoints

1. **Create model** in `api/models.py`
2. **Create serializer** in `api/serializers.py`
3. **Create view/viewset** in `api/views.py`
4. **Register URL** in `api/urls.py`
5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

## Environment Variables

Key variables in `.env`:

- `SECRET_KEY` - Django secret key (required)
- `DEBUG` - Debug mode (True/False)
- `ALLOWED_HOSTS` - Comma-separated hosts
- `DATABASE_URL` - Database connection string
- `CORS_ALLOWED_ORIGINS` - Allowed CORS origins

