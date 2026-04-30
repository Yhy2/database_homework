from flask import Blueprint, g

from backend.errors import ValidationError
from backend.repositories.user_repository import (
    authenticate_user,
    create_user_account,
)
from backend.responses import (
    create_auth_token,
    get_json_body,
    require_auth,
    success_response,
)

auth_api = Blueprint("auth_api", __name__)

DEMO_USER_ID = "u001"
DEMO_PASSWORD = "demo123456"


def _build_auth_payload(user):
    return {
        "user": user,
        "token": create_auth_token(user),
    }


def _normalize_text(payload, field, label, *, min_length=1, max_length=100):
    raw_value = payload.get(field)
    value = str(raw_value).strip() if raw_value is not None else ""
    if len(value) < min_length:
        raise ValidationError(f"{label}长度不能少于 {min_length} 位")
    if len(value) > max_length:
        raise ValidationError(f"{label}长度不能超过 {max_length} 位")
    return value


@auth_api.post("/api/auth/register")
def register():
    payload = get_json_body()
    user_id = _normalize_text(payload, "user_id", "用户编号", max_length=20)
    user_name = _normalize_text(payload, "user_name", "用户名", max_length=50)
    phone = _normalize_text(payload, "phone", "手机号", max_length=20)
    password = _normalize_text(payload, "password", "密码", min_length=6, max_length=128)

    user = create_user_account(
        user_id=user_id,
        user_name=user_name,
        phone=phone,
        password=password,
    )
    return success_response(_build_auth_payload(user), status=201)


@auth_api.post("/api/auth/login")
def login():
    payload = get_json_body()
    user_id = _normalize_text(payload, "user_id", "用户编号", max_length=20)
    password = _normalize_text(payload, "password", "密码", min_length=1, max_length=128)

    user = authenticate_user(user_id=user_id, password=password)
    return success_response(_build_auth_payload(user))


@auth_api.post("/api/auth/demo")
def login_demo():
    user = authenticate_user(user_id=DEMO_USER_ID, password=DEMO_PASSWORD)
    return success_response(_build_auth_payload(user))


@auth_api.get("/api/auth/me")
@require_auth
def get_me():
    return success_response(g.current_user)
