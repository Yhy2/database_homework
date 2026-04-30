from flask import Blueprint

from backend.errors import ValidationError
from backend.repositories.item_repository import (
    create_item,
    delete_item,
    list_items,
    update_item_price,
)
from backend.responses import get_json_body, require_auth, success_response

items_api = Blueprint("items_api", __name__)


def _normalize_price(value):
    try:
        price = float(value)
    except (TypeError, ValueError) as exc:
        raise ValidationError("价格必须是数字") from exc
    if price <= 0:
        raise ValidationError("价格必须大于 0")
    return round(price, 2)


@items_api.get("/api/items")
def get_items():
    return success_response(list_items())


@items_api.post("/api/items")
@require_auth
def post_item():
    payload = get_json_body()
    required_fields = ("item_id", "item_name", "category", "price", "seller_id")
    missing_fields = [field for field in required_fields if not payload.get(field)]
    if missing_fields:
        raise ValidationError(f"缺少字段: {', '.join(missing_fields)}")

    item = create_item(
        {
            "item_id": str(payload["item_id"]).strip(),
            "item_name": str(payload["item_name"]).strip(),
            "category": str(payload["category"]).strip(),
            "price": _normalize_price(payload["price"]),
            "status": int(payload.get("status", 0)),
            "seller_id": str(payload["seller_id"]).strip(),
        }
    )
    return success_response(item, status=201)


@items_api.patch("/api/items/<item_id>/price")
@require_auth
def patch_item_price(item_id):
    payload = get_json_body()
    if "price" not in payload:
        raise ValidationError("缺少字段: price")
    updated_item = update_item_price(item_id, _normalize_price(payload["price"]))
    return success_response(updated_item)


@items_api.delete("/api/items/<item_id>")
@require_auth
def remove_item(item_id):
    return success_response(delete_item(item_id))
