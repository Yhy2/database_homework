from flask import Blueprint

from backend.repositories.user_repository import list_users
from backend.responses import success_response

users_api = Blueprint("users_api", __name__)


@users_api.get("/api/users")
def get_users():
    return success_response(list_users())
