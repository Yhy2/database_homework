from pathlib import Path

from flask import Blueprint, current_app, send_from_directory

spa = Blueprint("spa", __name__)


def _dist_dir():
    return Path(current_app.config["FRONTEND_DIST"])


@spa.route("/", defaults={"path": ""})
@spa.route("/<path:path>")
def serve_spa(path):
    if path.startswith("api/"):
        return {"code": 40400, "message": "not found", "data": None}, 404

    dist_dir = _dist_dir()
    if not dist_dir.exists():
        return (
            """
            <html>
              <head><title>Campus Secondhand Platform</title></head>
              <body>
                <h1>Frontend build not found</h1>
                <p>Run <code>npm install</code> and <code>npm run build</code> in the frontend directory.</p>
              </body>
            </html>
            """,
            503,
        )

    asset_path = dist_dir / path
    if path and asset_path.exists() and asset_path.is_file():
        return send_from_directory(dist_dir, path)
    return send_from_directory(dist_dir, "index.html")
