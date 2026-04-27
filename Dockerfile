FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
ARG VITE_DEMO_ACCESS_TOKEN=local-demo-token
ENV VITE_DEMO_ACCESS_TOKEN=$VITE_DEMO_ACCESS_TOKEN
RUN npm run build

FROM python:3.11-slim AS runtime

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

COPY backend ./backend
COPY sql ./sql
COPY docs ./docs
COPY deploy ./deploy
COPY README.md ./
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

EXPOSE 5000

CMD ["gunicorn", "-c", "deploy/gunicorn.conf.py", "backend.app:app"]
