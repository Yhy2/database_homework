from pymysql.err import IntegrityError

from backend.db import fetch_all, fetch_one, transaction
from backend.errors import ConflictError, NotFoundError, ValidationError

ORDER_LIST_SQL = """
SELECT
    o.order_id,
    o.item_id,
    i.item_name,
    o.buyer_id,
    buyer.user_name AS buyer_name,
    i.seller_id,
    seller.user_name AS seller_name,
    o.order_date
FROM orders o
JOIN item i ON i.item_id = o.item_id
JOIN `user` buyer ON buyer.user_id = o.buyer_id
JOIN `user` seller ON seller.user_id = i.seller_id
"""


def list_orders():
    return fetch_all(f"{ORDER_LIST_SQL} ORDER BY o.order_date, o.order_id")


def get_order_by_id(order_id):
    return fetch_one(f"{ORDER_LIST_SQL} WHERE o.order_id = %s", (order_id,))


def create_purchase(*, item_id, buyer_id, order_date):
    try:
        with transaction() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT user_id FROM `user` WHERE user_id = %s",
                    (buyer_id,),
                )
                buyer = cursor.fetchone()
                if buyer is None:
                    raise ValidationError("买家不存在")

                cursor.execute(
                    """
                    SELECT item_id, item_name, status, seller_id
                    FROM item
                    WHERE item_id = %s
                    FOR UPDATE
                    """,
                    (item_id,),
                )
                item = cursor.fetchone()
                if item is None:
                    raise NotFoundError("商品不存在")
                if item["status"] == 1:
                    raise ConflictError("该商品已售出，不能重复购买")

                cursor.execute(
                    """
                    SELECT order_id
                    FROM orders
                    ORDER BY CAST(order_id AS UNSIGNED) DESC
                    LIMIT 1
                    FOR UPDATE
                    """
                )
                latest_order = cursor.fetchone()
                next_order_id = (
                    f"{int(latest_order['order_id']) + 1:04d}"
                    if latest_order
                    else "0001"
                )

                cursor.execute(
                    """
                    INSERT INTO orders (order_id, item_id, buyer_id, order_date)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (next_order_id, item_id, buyer_id, order_date),
                )
                cursor.execute(
                    "UPDATE item SET status = 1 WHERE item_id = %s",
                    (item_id,),
                )
    except IntegrityError as exc:
        raise ConflictError("购买失败，商品状态已发生变化") from exc

    created = get_order_by_id(next_order_id)
    if created is None:
        raise NotFoundError("订单创建后读取失败")
    return created
