from pymysql.err import IntegrityError

from backend.db import fetch_all, fetch_one, transaction
from backend.errors import ConflictError, NotFoundError, ValidationError

ITEM_BASE_SQL = """
SELECT
    i.item_id,
    i.item_name,
    i.category,
    i.price,
    i.status,
    i.seller_id,
    u.user_name AS seller_name
FROM item i
JOIN `user` u ON u.user_id = i.seller_id
"""


def list_items():
    return fetch_all(f"{ITEM_BASE_SQL} ORDER BY i.item_id")


def get_item_by_id(item_id):
    return fetch_one(f"{ITEM_BASE_SQL} WHERE i.item_id = %s", (item_id,))


def create_item(item):
    try:
        with transaction() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO item (
                        item_id, item_name, category, price, status, seller_id
                    ) VALUES (%s, %s, %s, %s, %s, %s)
                    """,
                    (
                        item["item_id"],
                        item["item_name"],
                        item["category"],
                        item["price"],
                        item["status"],
                        item["seller_id"],
                    ),
                )
    except IntegrityError as exc:
        message = str(exc)
        if "Duplicate entry" in message:
            raise ConflictError("商品编号已存在") from exc
        raise ValidationError("商品数据不合法") from exc

    created = get_item_by_id(item["item_id"])
    if created is None:
        raise NotFoundError("商品创建后读取失败")
    return created


def update_item_price(item_id, price):
    with transaction() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT item_id, status FROM item WHERE item_id = %s FOR UPDATE",
                (item_id,),
            )
            row = cursor.fetchone()
            if row is None:
                raise NotFoundError("商品不存在")
            if row["status"] == 1:
                raise ConflictError("已售商品不能修改价格")

            cursor.execute(
                "UPDATE item SET price = %s WHERE item_id = %s",
                (price, item_id),
            )

    updated = get_item_by_id(item_id)
    if updated is None:
        raise NotFoundError("商品不存在")
    return updated


def delete_item(item_id):
    with transaction() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT item_id, status FROM item WHERE item_id = %s FOR UPDATE",
                (item_id,),
            )
            row = cursor.fetchone()
            if row is None:
                raise NotFoundError("商品不存在")
            if row["status"] == 1:
                raise ConflictError("已售商品不能删除")

            cursor.execute("DELETE FROM item WHERE item_id = %s", (item_id,))

    return {"item_id": item_id}


def list_unsold_items():
    return fetch_all(
        f"{ITEM_BASE_SQL} WHERE i.status = 0 ORDER BY i.item_id",
    )
