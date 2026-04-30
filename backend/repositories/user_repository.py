from pymysql.err import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from backend.db import fetch_all, fetch_one, transaction
from backend.errors import ConflictError, UnauthorizedError, ValidationError


def list_users():
    return fetch_all(
        """
        SELECT user_id, user_name, phone
        FROM `user`
        ORDER BY user_id
        """
    )


def get_user_public_profile(user_id):
    return fetch_one(
        """
        SELECT user_id, user_name, phone
        FROM `user`
        WHERE user_id = %s
        """,
        (user_id,),
    )


def get_user_with_password_by_id(user_id):
    return fetch_one(
        """
        SELECT user_id, user_name, phone, password_hash
        FROM `user`
        WHERE user_id = %s
        """,
        (user_id,),
    )


def create_user_account(*, user_id, user_name, phone, password):
    password_hash = generate_password_hash(password, method="pbkdf2:sha256")

    try:
        with transaction() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO `user` (user_id, user_name, phone, password_hash)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (user_id, user_name, phone, password_hash),
                )
    except IntegrityError as exc:
        message = str(exc)
        if "Duplicate entry" in message:
            if "phone" in message:
                raise ConflictError("手机号已注册") from exc
            raise ConflictError("用户编号已存在") from exc
        raise ValidationError("用户数据不合法") from exc

    return get_user_public_profile(user_id)


def authenticate_user(*, user_id, password):
    user = get_user_with_password_by_id(user_id)
    if not user or not check_password_hash(user["password_hash"], password):
        raise UnauthorizedError("用户编号或密码不正确")

    return {
        "user_id": user["user_id"],
        "user_name": user["user_name"],
        "phone": user["phone"],
    }
