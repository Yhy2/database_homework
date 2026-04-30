from datetime import date

from flask import Blueprint

from backend.errors import ValidationError
from backend.repositories.order_repository import create_purchase, list_orders
from backend.responses import get_json_body, require_auth, success_response

orders_api = Blueprint("orders_api", __name__)


@orders_api.get("/api/orders")
def get_orders():
    return success_response(list_orders())


@orders_api.post("/api/purchase")
@require_auth
def purchase_item():
    payload = get_json_body()
    if not payload.get("item_id"):
        raise ValidationError("缺少字段: item_id")
    if not payload.get("buyer_id"):
        raise ValidationError("缺少字段: buyer_id")

    order_date = payload.get("order_date") or date.today().isoformat()
    created_order = create_purchase(
        item_id=str(payload["item_id"]).strip(),
        buyer_id=str(payload["buyer_id"]).strip(),
        order_date=order_date,
    )
    return success_response(created_order, status=201)
