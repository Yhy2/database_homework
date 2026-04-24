from datetime import date, datetime
from decimal import Decimal
from functools import wraps

from flask import current_app, jsonify, request

from backend.errors import ForbiddenError, ValidationError


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


def require_demo_access(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        expected = current_app.config.get("DEMO_ACCESS_TOKEN")
        provided = request.headers.get("X-Demo-Token")
        if expected and provided != expected:
            raise ForbiddenError("缺少演示写入权限")
        return view(*args, **kwargs)

    return wrapped
