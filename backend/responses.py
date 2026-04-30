from datetime import date, datetime
from decimal import Decimal
from functools import wraps

from flask import current_app, g, jsonify, request
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

from backend.errors import UnauthorizedError, ValidationError
from backend.repositories.user_repository import get_user_public_profile


def _normalize_json_data(data):
    if isinstance(data, Decimal):
        if data == data.to_integral_value():
            return int(data)
        return float(data)
    if isinstance(data, (date, datetime)):
        return data.isoformat()
    if isinstance(data, dict):
        return {key: _normalize_json_data(value) for key, value in data.items()}
    if isinstance(data, list):
        return [_normalize_json_data(item) for item in data]
    if isinstance(data, tuple):
        return [_normalize_json_data(item) for item in data]
    return data


def success_response(data=None, message="success", status=200):
    return (
        jsonify({"code": 0, "message": message, "data": _normalize_json_data(data)}),
        status,
    )


def get_json_body():
    payload = request.get_json(silent=True)
    if payload is None:
        raise ValidationError("请求体必须是 JSON")
    return payload


def _auth_serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="campus-auth")


def create_auth_token(user):
    return _auth_serializer().dumps({"user_id": user["user_id"]})


def resolve_current_user():
    auth_header = request.headers.get("Authorization", "")
    prefix = "Bearer "
    if not auth_header.startswith(prefix):
        raise UnauthorizedError("请先登录")

    token = auth_header[len(prefix) :].strip()
    try:
        payload = _auth_serializer().loads(
            token,
            max_age=current_app.config["AUTH_TOKEN_MAX_AGE_SECONDS"],
        )
    except SignatureExpired as exc:
        raise UnauthorizedError("登录已过期，请重新登录") from exc
    except BadSignature as exc:
        raise UnauthorizedError("登录凭证无效") from exc

    user_id = payload.get("user_id")
    user = get_user_public_profile(user_id) if user_id else None
    if user is None:
        raise UnauthorizedError("登录用户不存在")
    return user


def require_auth(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        g.current_user = resolve_current_user()
        return view(*args, **kwargs)

    return wrapped
