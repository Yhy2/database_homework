from contextlib import contextmanager

import pymysql
from flask import current_app


def _connection_kwargs():
    return {
        "host": current_app.config["MYSQL_HOST"],
        "port": current_app.config["MYSQL_PORT"],
        "user": current_app.config["MYSQL_USER"],
        "password": current_app.config["MYSQL_PASSWORD"],
        "database": current_app.config["MYSQL_DATABASE"],
        "charset": "utf8mb4",
        "cursorclass": pymysql.cursors.DictCursor,
        "autocommit": False,
    }


def get_connection():
    return pymysql.connect(**_connection_kwargs())


@contextmanager
def connection_scope():
    connection = get_connection()
    try:
        yield connection
    finally:
        connection.close()


@contextmanager
def transaction():
    connection = get_connection()
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def fetch_all(query, params=None):
    with connection_scope() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, params or ())
            return cursor.fetchall()


def fetch_one(query, params=None):
    with connection_scope() as connection:
        with connection.cursor() as cursor:
            cursor.execute(query, params or ())
            return cursor.fetchone()


def check_database_connection():
    row = fetch_one("SELECT 1 AS ok")
    return bool(row and row["ok"] == 1)
