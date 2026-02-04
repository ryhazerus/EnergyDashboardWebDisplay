# backend/Dockerfile
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/app

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libsqlite3-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="/root/.local/bin:$PATH"

COPY pyproject.toml poetry.lock ./

# Disable the virtualenv so packages install into the system Python
# (/usr/local/lib), not into /app.  The runtime volume mount (./backend:/app)
# therefore cannot clobber them.
RUN poetry config virtualenvs.create false \
    && poetry install --no-root --no-interaction --no-ansi --only main

COPY . .

# Register energy_dashboard as an installed package so it is importable
# regardless of working directory.  --no-deps because poetry already handled
# the dependency graph.
RUN pip install --no-deps -e .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "energy_dashboard.main:app", "--host", "0.0.0.0", "--port", "8000"]
