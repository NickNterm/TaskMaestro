FROM python:3.13-slim

RUN mkdir /app

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
COPY ./scripts /scripts
RUN chmod +x /scripts/run.sh /scripts/rundev.sh

EXPOSE 8000

ARG DEV=false
ENV PATH="/scripts:/py/bin:$PATH"

CMD if [ "$DEV" = "true" ]; then rundev.sh; else run.sh; fi

