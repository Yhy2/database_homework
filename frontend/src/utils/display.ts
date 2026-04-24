export function formatCategory(category: string) {
  const categoryMap: Record<string, string> = {
    Book: "教材书籍",
    DailyGoods: "生活用品",
    Electronics: "电子设备",
    Furniture: "宿舍家具",
  };

  return categoryMap[category] ?? category;
}

export function formatStatus(status: number) {
  return status === 1 ? "已售出" : "在售";
}

export function statusTagType(status: number) {
  return status === 1 ? "danger" : "success";
}

export function formatPrice(price: number) {
  return `¥${Number(price).toFixed(2)}`;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "请求失败，请稍后重试";
}
