.PHONY: help install migrate run test clean

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make migrate    - Run database migrations"
	@echo "  make run        - Run development server"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean Python cache files"

install:
	pip install -r requirements.txt

migrate:
	python manage.py migrate

makemigrations:
	python manage.py makemigrations

run:
	python manage.py runserver

test:
	pytest

clean:
	find . -type d -name __pycache__ -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete

superuser:
	python manage.py createsuperuser

collectstatic:
	python manage.py collectstatic --noinput

