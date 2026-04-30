import pytest


def test_health_endpoint_returns_ok(client):
    response = client.get("/api/health")

    assert response.status_code == 200
    payload = response.get_json()
    assert payload["code"] == 0
    assert payload["data"]["status"] == "ok"
    assert payload["data"]["database"] == "ok"


def test_seeded_list_endpoints_return_real_data(client):
    users_response = client.get("/api/users")
    items_response = client.get("/api/items")
    orders_response = client.get("/api/orders")

    assert users_response.status_code == 200
    assert items_response.status_code == 200
    assert orders_response.status_code == 200

    assert len(users_response.get_json()["data"]) == 4
    assert len(items_response.get_json()["data"]) == 6
    assert len(orders_response.get_json()["data"]) == 2


def test_auth_register_login_and_demo_flow(client):
    register_response = client.post(
        "/api/auth/register",
        json={
            "user_id": "u099",
            "user_name": "ChenQi",
            "phone": "13900000099",
            "password": "secret123",
        },
    )
    assert register_response.status_code == 201
    register_payload = register_response.get_json()["data"]
    assert register_payload["user"]["user_id"] == "u099"
    assert register_payload["token"]

    login_response = client.post(
        "/api/auth/login",
        json={"user_id": "u099", "password": "secret123"},
    )
    assert login_response.status_code == 200
    token = login_response.get_json()["data"]["token"]

    me_response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert me_response.status_code == 200
    assert me_response.get_json()["data"]["user_name"] == "ChenQi"

    demo_response = client.post("/api/auth/demo")
    assert demo_response.status_code == 200
    assert demo_response.get_json()["data"]["user"]["user_id"] == "u001"


def test_write_endpoints_require_login(client):
    response = client.post(
        "/api/items",
        json={
            "item_id": "i098",
            "item_name": "Notebook",
            "category": "Book",
            "price": 18,
            "seller_id": "u002",
        },
    )

    assert response.status_code == 401


def test_item_crud_flow(client, auth_headers):
    create_response = client.post(
        "/api/items",
        headers=auth_headers,
        json={
            "item_id": "i099",
            "item_name": "Router",
            "category": "Electronics",
            "price": 88,
            "seller_id": "u002",
        },
    )

    assert create_response.status_code == 201
    assert create_response.get_json()["data"]["item_id"] == "i099"

    update_response = client.patch(
        "/api/items/i099/price",
        headers=auth_headers,
        json={"price": 79},
    )

    assert update_response.status_code == 200
    assert update_response.get_json()["data"]["price"] == 79

    delete_response = client.delete("/api/items/i099", headers=auth_headers)
    assert delete_response.status_code == 200

    items = client.get("/api/items").get_json()["data"]
    assert all(item["item_id"] != "i099" for item in items)


def test_reports_and_views_return_required_sections(client):
    basic_response = client.get("/api/reports/basic")
    join_response = client.get("/api/reports/join")
    aggregate_response = client.get("/api/reports/aggregate")
    sold_view_response = client.get("/api/views/sold-items")
    unsold_view_response = client.get("/api/views/unsold-items")

    assert basic_response.status_code == 200
    assert join_response.status_code == 200
    assert aggregate_response.status_code == 200
    assert sold_view_response.status_code == 200
    assert unsold_view_response.status_code == 200

    basic_data = basic_response.get_json()["data"]
    assert len(basic_data["unsold_items"]) == 4
    assert len(basic_data["price_above_30"]) == 4
    assert len(basic_data["daily_goods_items"]) == 2
    assert {row["item_id"] for row in basic_data["seller_u001_items"]} == {
        "i001",
        "i003",
        "i006",
    }

    join_data = join_response.get_json()["data"]
    assert any(
        row["item_name"] == "DeskLamp" and row["buyer_name"] == "ZhangSan"
        for row in join_data["sold_items_with_buyers"]
    )
    assert any(
        row["item_name"] == "Chair" and row["buyer_name"] == "LiSi"
        for row in join_data["orders_with_item_and_buyer"]
    )
    assert len(join_data["u001_sales_status"]) == 3

    aggregate_data = aggregate_response.get_json()["data"]
    assert aggregate_data["total_items"] == 6
    assert pytest.approx(aggregate_data["average_price"], abs=0.01) == 43.33
    assert aggregate_data["top_seller"]["user_id"] == "u001"
    assert aggregate_data["top_seller"]["item_count"] == 3

    sold_view = sold_view_response.get_json()["data"]
    unsold_view = unsold_view_response.get_json()["data"]
    assert len(sold_view) == 2
    assert len(unsold_view) == 4
