def test_purchase_marks_item_sold_and_creates_order(client, demo_headers, fetch_one):
    response = client.post(
        "/api/purchase",
        headers=demo_headers,
        json={"item_id": "i001", "buyer_id": "u003", "order_date": "2024-05-10"},
    )

    assert response.status_code == 201
    payload = response.get_json()
    assert payload["code"] == 0
    assert payload["data"]["item_id"] == "i001"

    item_row = fetch_one("SELECT status FROM item WHERE item_id = %s", ("i001",))
    order_row = fetch_one(
        "SELECT order_id, buyer_id FROM orders WHERE item_id = %s",
        ("i001",),
    )

    assert item_row["status"] == 1
    assert order_row["buyer_id"] == "u003"


def test_duplicate_purchase_is_rejected(client, demo_headers):
    first_response = client.post(
        "/api/purchase",
        headers=demo_headers,
        json={"item_id": "i003", "buyer_id": "u004", "order_date": "2024-05-11"},
    )
    second_response = client.post(
        "/api/purchase",
        headers=demo_headers,
        json={"item_id": "i003", "buyer_id": "u002", "order_date": "2024-05-12"},
    )

    assert first_response.status_code == 201
    assert second_response.status_code == 409
    payload = second_response.get_json()
    assert payload["code"] == 40901
