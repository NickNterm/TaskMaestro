# Docker Deployment Guide

## Quick Start

### Local Development

1. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Start services:**
   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   - API: http://localhost:8000/api/
   - Swagger: http://localhost:8000/api/docs/
   - Admin: http://localhost:8000/admin/

### Production Deployment

1. **Update `.env` file with production values:**
   - Set `DEBUG=False`
   - Set `DJANGO_ALLOWED_HOSTS` to your domain
   - Configure database credentials
   - Set `REGISTRY_URL`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD` for your Docker registry

2. **Build and push image:**
   ```bash
   docker build -t your-registry/taskmaestro:latest .
   docker push your-registry/taskmaestro:latest
   ```

3. **Deploy:**
   ```bash
   docker compose -f compose-deployment.yml up -d
   ```

## Environment Variables

### Required Variables

- `DJANGO_SECRET_KEY` or `SECRET_KEY` - Django secret key
- `DATABASE_NAME` - PostgreSQL database name
- `DATABASE_USERNAME` - PostgreSQL username
- `DATABASE_PASSWORD` - PostgreSQL password

### Optional Variables

- `DEBUG` - Debug mode (True/False)
- `DJANGO_ALLOWED_HOSTS` - Comma-separated list of allowed hosts
- `DJANGO_LOGLEVEL` - Logging level (INFO, WARNING, ERROR)
- `REDIS_URL` - Redis connection URL
- `CORS_ALLOWED_ORIGINS` - Allowed CORS origins
- `SMTP1`, `PORT1`, `EMAIL1`, `PASSWORD1` - Email configuration
- `REGISTRY_URL`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD` - Docker registry credentials

## Database Configuration

The settings support two formats:

### Format 1: DATABASE_URL (for .env file)
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

### Format 2: Individual variables (for Docker)
```
DATABASE_ENGINE=django.db.backends.postgresql
DATABASE_NAME=taskmaestro
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_HOST=db
DATABASE_PORT=5432
```

## Services

### Development (compose.yml)
- **taskmaestro**: Django development server
- **db**: PostgreSQL 17
- **redis**: Redis 7

### Production (compose-deployment.yml)
- **taskmaestro**: Django with Gunicorn
- **db**: PostgreSQL 17
- **redis**: Redis 7
- **watchtower**: Auto-update service

## Volumes

### Development
- `postgres_data`: PostgreSQL data
- `static_volume`: Static files
- `media_volume`: Media files

### Production
- `postgres_data`: PostgreSQL data
- `/srv/staticfiles`: Static files (host path)
- `/srv/media`: Media files (host path)

## Commands

```bash
# Build and start
docker compose up --build

# Start in background
docker compose up -d

# View logs
docker compose logs -f taskmaestro

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# Run migrations
docker compose exec taskmaestro python manage.py migrate

# Create superuser
docker compose exec taskmaestro python manage.py createsuperuser

# Access Django shell
docker compose exec taskmaestro python manage.py shell
```

## Troubleshooting

### Database connection issues
- Ensure database service is healthy: `docker compose ps`
- Check database credentials in `.env`
- Wait for database to be ready (healthcheck should handle this)

### Static files not loading
- Run collectstatic: `docker compose exec taskmaestro python manage.py collectstatic`
- Check volume mounts in compose file

### Permission issues
- Ensure scripts are executable: `chmod +x scripts/*.sh`
- Check file permissions in volumes

