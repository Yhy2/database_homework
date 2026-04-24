from backend.db import fetch_all, fetch_one

ITEM_DETAIL_SQL = """
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


def get_basic_reports():
    return {
        "unsold_items": fetch_all(
            f"{ITEM_DETAIL_SQL} WHERE i.status = 0 ORDER BY i.item_id"
        ),
        "price_above_30": fetch_all(
            f"{ITEM_DETAIL_SQL} WHERE i.price > 30 ORDER BY i.item_id"
        ),
        "daily_goods_items": fetch_all(
            f"{ITEM_DETAIL_SQL} WHERE i.category = 'DailyGoods' ORDER BY i.item_id"
        ),
        "seller_u001_items": fetch_all(
            f"{ITEM_DETAIL_SQL} WHERE i.seller_id = 'u001' ORDER BY i.item_id"
        ),
    }


def get_join_reports():
    return {
        "sold_items_with_buyers": fetch_all(
            """
            SELECT
                i.item_id,
                i.item_name,
                o.buyer_id,
                u.user_name AS buyer_name
            FROM item i
            JOIN orders o ON o.item_id = i.item_id
            JOIN `user` u ON u.user_id = o.buyer_id
            ORDER BY i.item_id
            """
        ),
        "orders_with_item_and_buyer": fetch_all(
            """
            SELECT
                o.order_id,
                i.item_name,
                buyer.user_name AS buyer_name,
                o.order_date
            FROM orders o
            JOIN item i ON i.item_id = o.item_id
            JOIN `user` buyer ON buyer.user_id = o.buyer_id
            ORDER BY o.order_id
            """
        ),
        "u001_sales_status": fetch_all(
            """
            SELECT
                i.item_id,
                i.item_name,
                CASE
                    WHEN o.item_id IS NULL THEN '未购买'
                    ELSE '已购买'
                END AS purchase_status,
                o.order_id,
                buyer.user_name AS buyer_name
            FROM item i
            LEFT JOIN orders o ON o.item_id = i.item_id
            LEFT JOIN `user` buyer ON buyer.user_id = o.buyer_id
            WHERE i.seller_id = 'u001'
            ORDER BY i.item_id
            """
        ),
    }


def get_aggregate_reports():
    total_items = fetch_one("SELECT COUNT(*) AS total_items FROM item")
    average_price = fetch_one(
        "SELECT ROUND(AVG(price), 2) AS average_price FROM item"
    )
    top_seller = fetch_one(
        """
        SELECT
            u.user_id,
            u.user_name,
            COUNT(*) AS item_count
        FROM item i
        JOIN `user` u ON u.user_id = i.seller_id
        GROUP BY u.user_id, u.user_name
        ORDER BY item_count DESC, u.user_id ASC
        LIMIT 1
        """
    )
    category_counts = fetch_all(
        """
        SELECT
            category,
            COUNT(*) AS item_count
        FROM item
        GROUP BY category
        ORDER BY category
        """
    )

    return {
        "total_items": total_items["total_items"],
        "category_counts": category_counts,
        "average_price": float(average_price["average_price"]),
        "top_seller": top_seller,
    }


def get_sold_item_view():
    return fetch_all(
        """
        SELECT item_name, buyer_id
        FROM sold_item_view
        ORDER BY item_name
        """
    )


def get_unsold_item_view():
    return fetch_all(
        """
        SELECT item_id, item_name, category, price, seller_id
        FROM unsold_item_view
        ORDER BY item_id
        """
    )
