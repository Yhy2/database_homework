DROP VIEW IF EXISTS sold_item_view;
DROP VIEW IF EXISTS unsold_item_view;

CREATE VIEW sold_item_view AS
SELECT
    i.item_name,
    o.buyer_id
FROM item i
JOIN orders o ON o.item_id = i.item_id;

CREATE VIEW unsold_item_view AS
SELECT
    i.item_id,
    i.item_name,
    i.category,
    i.price,
    i.seller_id
FROM item i
WHERE i.status = 0;
