def test_seed_data_satisfies_consistency_rules(fetch_one):
    unsold_in_orders = fetch_one(
        """
        SELECT COUNT(*) AS count
        FROM item i
        JOIN orders o ON i.item_id = o.item_id
        WHERE i.status = 0
        """
    )
    sold_without_orders = fetch_one(
        """
        SELECT COUNT(*) AS count
        FROM item i
        LEFT JOIN orders o ON i.item_id = o.item_id
        WHERE i.status = 1 AND o.item_id IS NULL
        """
    )

    assert unsold_in_orders["count"] == 0
    assert sold_without_orders["count"] == 0


def test_required_query_result_sets_match_expected(fetch_all, fetch_one):
    unsold_items = fetch_all("SELECT item_id FROM item WHERE status = 0 ORDER BY item_id")
    expensive_items = fetch_all(
        "SELECT item_id FROM item WHERE price > 30 ORDER BY item_id"
    )
    daily_goods = fetch_all(
        "SELECT item_id FROM item WHERE category = 'DailyGoods' ORDER BY item_id"
    )
    top_seller = fetch_one(
        """
        SELECT seller_id, COUNT(*) AS item_count
        FROM item
        GROUP BY seller_id
        ORDER BY item_count DESC, seller_id ASC
        LIMIT 1
        """
    )
    sold_view = fetch_all(
        "SELECT item_name, buyer_id FROM sold_item_view ORDER BY item_name"
    )

    assert [row["item_id"] for row in unsold_items] == ["i001", "i003", "i005", "i006"]
    assert [row["item_id"] for row in expensive_items] == ["i002", "i003", "i004", "i006"]
    assert [row["item_id"] for row in daily_goods] == ["i002", "i005"]
    assert top_seller["seller_id"] == "u001"
    assert top_seller["item_count"] == 3
    assert sold_view == [
        {"item_name": "Chair", "buyer_id": "u002"},
        {"item_name": "DeskLamp", "buyer_id": "u001"},
    ]
