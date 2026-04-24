from flask import Blueprint

from backend.repositories.report_repository import (
    get_aggregate_reports,
    get_basic_reports,
    get_join_reports,
    get_sold_item_view,
    get_unsold_item_view,
)
from backend.responses import success_response

reports_api = Blueprint("reports_api", __name__)


@reports_api.get("/api/reports/basic")
def get_basic():
    return success_response(get_basic_reports())


@reports_api.get("/api/reports/join")
def get_join():
    return success_response(get_join_reports())


@reports_api.get("/api/reports/aggregate")
def get_aggregate():
    return success_response(get_aggregate_reports())


@reports_api.get("/api/views/sold-items")
def get_sold_view():
    return success_response(get_sold_item_view())


@reports_api.get("/api/views/unsold-items")
def get_unsold_view():
    return success_response(get_unsold_item_view())
