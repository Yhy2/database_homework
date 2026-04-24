START TRANSACTION;

SELECT status
FROM item
WHERE item_id = %s
FOR UPDATE;

INSERT INTO orders (order_id, item_id, buyer_id, order_date)
VALUES (%s, %s, %s, %s);

UPDATE item
SET status = 1
WHERE item_id = %s;

COMMIT;
