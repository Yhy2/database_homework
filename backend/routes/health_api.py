from flask import Blueprint

from backend.db import check_database_connection
from backend.responses import success_response

health_api = Blueprint("health_api", __name__)


@health_api.get("/api/health")
def get_health():
    database_ok = check_database_connection()
    return success_response(
        {"status": "ok", "database": "ok" if database_ok else "error"}
    )
