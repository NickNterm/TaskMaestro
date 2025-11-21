#!/bin/bash
set -e

echo "Starting TaskMaestro in development mode..."

# Wait for database to be ready
echo "Waiting for database..."
while ! nc -z ${DATABASE_HOST:-db} ${DATABASE_PORT:-5432}; do
  sleep 0.1
done
echo "Database is ready!"

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Start Django development server
echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000

