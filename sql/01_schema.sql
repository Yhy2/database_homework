DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    user_id VARCHAR(20) PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE item (
    item_id VARCHAR(20) PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    seller_id VARCHAR(20) NOT NULL,
    CONSTRAINT chk_item_status CHECK (status IN (0, 1)),
    CONSTRAINT chk_item_price CHECK (price >= 0),
    CONSTRAINT fk_item_seller
        FOREIGN KEY (seller_id) REFERENCES `user` (user_id)
);

CREATE TABLE orders (
    order_id VARCHAR(20) PRIMARY KEY,
    item_id VARCHAR(20) NOT NULL UNIQUE,
    buyer_id VARCHAR(20) NOT NULL,
    order_date DATE NOT NULL,
    CONSTRAINT fk_orders_item
        FOREIGN KEY (item_id) REFERENCES item (item_id),
    CONSTRAINT fk_orders_buyer
        FOREIGN KEY (buyer_id) REFERENCES `user` (user_id)
);
