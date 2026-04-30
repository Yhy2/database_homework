INSERT INTO `user` (user_id, user_name, phone, password_hash) VALUES
('u001', 'ZhangSan', '13800000001', 'pbkdf2:sha256:600000$campus-demo-salt$97e3153876af4e7906f32a939d5872ec527e0b78d69dea594facbaeba59079a9'),
('u002', 'LiSi', '13800000002', 'pbkdf2:sha256:600000$campus-demo-salt$97e3153876af4e7906f32a939d5872ec527e0b78d69dea594facbaeba59079a9'),
('u003', 'WangWu', '13800000003', 'pbkdf2:sha256:600000$campus-demo-salt$97e3153876af4e7906f32a939d5872ec527e0b78d69dea594facbaeba59079a9'),
('u004', 'ZhaoLiu', '13800000004', 'pbkdf2:sha256:600000$campus-demo-salt$97e3153876af4e7906f32a939d5872ec527e0b78d69dea594facbaeba59079a9');

INSERT INTO item (item_id, item_name, category, price, status, seller_id) VALUES
('i001', 'CalculusBook', 'Book', 20, 0, 'u001'),
('i002', 'DeskLamp', 'DailyGoods', 35, 1, 'u002'),
('i003', 'Microcontroller', 'Electronics', 80, 0, 'u001'),
('i004', 'Chair', 'Furniture', 50, 1, 'u003'),
('i005', 'WaterBottle', 'DailyGoods', 15, 0, 'u004'),
('i006', 'Keyboard', 'Electronics', 60, 0, 'u001');

INSERT INTO orders (order_id, item_id, buyer_id, order_date) VALUES
('0001', 'i002', 'u001', '2024-05-01'),
('0002', 'i004', 'u002', '2024-05-03');
