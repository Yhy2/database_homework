from functools import wraps

from flask import current_app, jsonify, request

from backend.errors import ForbiddenError, ValidationError


def success_response(data=None, message="success", status=200):
    return jsonify({"code": 0, "message": message, "data": data}), status


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
