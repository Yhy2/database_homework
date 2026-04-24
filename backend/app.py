from flask import Flask, jsonify, request
from pymysql import MySQLError

from backend.config import Config
from backend.errors import ApiError, ServerError
from backend.routes.health_api import health_api
from backend.routes.items_api import items_api
from backend.routes.orders_api import orders_api
from backend.routes.reports_api import reports_api
from backend.routes.spa import spa
from backend.routes.users_api import users_api


def create_app(config_overrides=None):
    app = Flask(__name__, static_folder=None)
    app.config.from_mapping(Config.as_dict())
    if config_overrides:
        app.config.update(config_overrides)

    app.register_blueprint(health_api)
    app.register_blueprint(users_api)
    app.register_blueprint(items_api)
    app.register_blueprint(orders_api)
    app.register_blueprint(reports_api)
    app.register_blueprint(spa)

    @app.errorhandler(ApiError)
    def handle_api_error(error):
        return (
            jsonify({"code": error.code, "message": error.message, "data": None}),
            error.http_status,
        )

    @app.errorhandler(MySQLError)
    def handle_mysql_error(error):
        app.logger.exception("Database error: %s", error)
        server_error = ServerError("数据库操作失败")
        return (
            jsonify(
                {
                    "code": server_error.code,
                    "message": server_error.message,
                    "data": None,
                }
            ),
            server_error.http_status,
        )

    @app.errorhandler(404)
    def handle_not_found(_error):
        if request.path.startswith("/api/"):
            return jsonify({"code": 40400, "message": "not found", "data": None}), 404
        return spa.view_functions["spa.serve_spa"](request.path.lstrip("/"))

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        app.logger.exception("Unexpected server error: %s", error)
        server_error = ServerError()
        return (
            jsonify(
                {
                    "code": server_error.code,
                    "message": server_error.message,
                    "data": None,
                }
            ),
            server_error.http_status,
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
