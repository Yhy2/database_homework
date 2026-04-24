export interface User {
    user_id: string;
    user_name: string;
    phone: string;
}
export interface Item {
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    status: number;
    seller_id: string;
    seller_name?: string;
}
export interface Order {
    order_id: string;
    item_id: string;
    item_name: string;
    buyer_id: string;
    buyer_name: string;
    seller_id: string;
    seller_name: string;
    order_date: string;
}
export interface HealthStatus {
    status: string;
    database: string;
}
export interface BasicReports {
    unsold_items: Item[];
    price_above_30: Item[];
    daily_goods_items: Item[];
    seller_u001_items: Item[];
}
export interface JoinReports {
    sold_items_with_buyers: Array<{
        item_id: string;
        item_name: string;
        buyer_id: string;
        buyer_name: string;
    }>;
    orders_with_item_and_buyer: Array<{
        order_id: string;
        item_name: string;
        buyer_name: string;
        order_date: string;
    }>;
    u001_sales_status: Array<{
        item_id: string;
        item_name: string;
        purchase_status: string;
        order_id?: string;
        buyer_name?: string;
    }>;
}
export interface AggregateReports {
    total_items: number;
    category_counts: Array<{
        category: string;
        item_count: number;
    }>;
    average_price: number;
    top_seller: {
        user_id: string;
        user_name: string;
        item_count: number;
    };
}
export interface CreateItemPayload {
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    seller_id: string;
}
export interface PurchasePayload {
    item_id: string;
    buyer_id: string;
    order_date?: string;
}
export interface TableColumn {
    key: string;
    label: string;
    minWidth?: number;
    width?: number;
}
