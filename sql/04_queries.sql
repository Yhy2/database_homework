-- 基本查询 1：所有未售出的商品
SELECT item_id, item_name, category, price, seller_id
FROM item
WHERE status = 0
ORDER BY item_id;

-- 基本查询 2：价格大于 30 的商品
SELECT item_id, item_name, price
FROM item
WHERE price > 30
ORDER BY item_id;

-- 基本查询 3：生活用品类商品
SELECT item_id, item_name, price
FROM item
WHERE category = 'DailyGoods'
ORDER BY item_id;

-- 基本查询 4：u001 发布的所有商品
SELECT item_id, item_name, category, status
FROM item
WHERE seller_id = 'u001'
ORDER BY item_id;

-- 连接查询 1：已售商品及买家姓名
SELECT i.item_name, u.user_name AS buyer_name
FROM item i
JOIN orders o ON o.item_id = i.item_id
JOIN `user` u ON u.user_id = o.buyer_id
ORDER BY i.item_id;

-- 连接查询 2：每个订单的商品名、买家名、日期
SELECT o.order_id, i.item_name, u.user_name AS buyer_name, o.order_date
FROM orders o
JOIN item i ON i.item_id = o.item_id
JOIN `user` u ON u.user_id = o.buyer_id
ORDER BY o.order_id;

-- 连接查询 3：卖家是 u001 的商品是否被购买
SELECT
    i.item_id,
    i.item_name,
    CASE WHEN o.item_id IS NULL THEN '未购买' ELSE '已购买' END AS purchase_status
FROM item i
LEFT JOIN orders o ON o.item_id = i.item_id
WHERE i.seller_id = 'u001'
ORDER BY i.item_id;

-- 聚合与分组 1：商品总数
SELECT COUNT(*) AS total_items
FROM item;

-- 聚合与分组 2：每类商品数量
SELECT category, COUNT(*) AS item_count
FROM item
GROUP BY category
ORDER BY category;

-- 聚合与分组 3：所有商品平均价格
SELECT ROUND(AVG(price), 2) AS average_price
FROM item;

-- 聚合与分组 4：发布商品数量最多的用户
SELECT u.user_id, u.user_name, COUNT(*) AS item_count
FROM item i
JOIN `user` u ON u.user_id = i.seller_id
GROUP BY u.user_id, u.user_name
ORDER BY item_count DESC, u.user_id ASC
LIMIT 1;
