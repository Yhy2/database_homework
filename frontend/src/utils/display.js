export function formatCategory(category) {
    const categoryMap = {
        Book: "教材书籍",
        DailyGoods: "生活用品",
        Electronics: "电子设备",
        Furniture: "宿舍家具",
    };
    return categoryMap[category] ?? category;
}
export function formatStatus(status) {
    return status === 1 ? "已售出" : "在售";
}
export function statusTagType(status) {
    return status === 1 ? "danger" : "success";
}
export function formatPrice(price) {
    return `¥${Number(price).toFixed(2)}`;
}
export function getErrorMessage(error) {
    return error instanceof Error ? error.message : "请求失败，请稍后重试";
}
