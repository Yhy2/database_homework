import os
import sys
from pathlib import Path

import pymysql
import pytest

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.app import create_app

TEST_DATABASE = os.getenv("MYSQL_TEST_DATABASE", "campus_secondhand_test")
DEMO_TOKEN = "local-demo-token"


def _connect(*, database=None):
    return pymysql.connect(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_ROOT_USER", "root"),
        password=os.getenv("MYSQL_ROOT_PASSWORD", "root"),
        database=database,
        charset="utf8mb4",
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor,
    )


def _execute_sql_file(connection, path: Path):
    statements = []
    current = []
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("--"):
            continue
        current.append(line)
        if stripped.endswith(";"):
            statements.append("\n".join(current))
            current = []

    with connection.cursor() as cursor:
        for statement in statements:
            cursor.execute(statement)


@pytest.fixture(autouse=True)
def reset_database():
    root_connection = _connect()
    try:
        with root_connection.cursor() as cursor:
            cursor.execute(f"DROP DATABASE IF EXISTS `{TEST_DATABASE}`")
            cursor.execute(
                f"CREATE DATABASE `{TEST_DATABASE}` "
                "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
            )
    finally:
        root_connection.close()

    database_connection = _connect(database=TEST_DATABASE)
    try:
        for filename in ("01_schema.sql", "02_seed.sql", "03_views.sql"):
            _execute_sql_file(database_connection, ROOT / "sql" / filename)
    finally:
        database_connection.close()

    yield


@pytest.fixture()
def app():
    os.environ["MYSQL_DATABASE"] = TEST_DATABASE
    os.environ["DEMO_ACCESS_TOKEN"] = DEMO_TOKEN
    application = create_app({"TESTING": True})
    yield application


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def demo_headers():
    return {"X-Demo-Token": DEMO_TOKEN}


@pytest.fixture()
def fetch_one():
    def _fetch(query, params=None):
        connection = _connect(database=TEST_DATABASE)
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchone()
        finally:
            connection.close()

    return _fetch


@pytest.fixture()
def fetch_all():
    def _fetch(query, params=None):
        connection = _connect(database=TEST_DATABASE)
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, params or ())
                return cursor.fetchall()
        finally:
            connection.close()

    return _fetch
