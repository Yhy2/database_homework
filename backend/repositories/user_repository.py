from backend.db import fetch_all


def list_users():
    return fetch_all(
        """
        SELECT user_id, user_name, phone
        FROM `user`
        ORDER BY user_id
        """
    )
