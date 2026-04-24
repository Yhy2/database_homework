import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent


class Config:
    DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
    TESTING = False
    SECRET_KEY = os.getenv("SECRET_KEY", "campus-secondhand-demo-secret")

    MYSQL_HOST = os.getenv("MYSQL_HOST", "127.0.0.1")
    MYSQL_PORT = int(os.getenv("MYSQL_PORT", "3306"))
    MYSQL_DATABASE = os.getenv("MYSQL_DATABASE", "campus_secondhand")
    MYSQL_USER = os.getenv("MYSQL_USER") or os.getenv("MYSQL_ROOT_USER", "root")
    MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD") or os.getenv("MYSQL_ROOT_PASSWORD", "root")

    DEMO_ACCESS_TOKEN = os.getenv("DEMO_ACCESS_TOKEN", "local-demo-token")
    FRONTEND_DIST = str(BASE_DIR / "frontend" / "dist")
