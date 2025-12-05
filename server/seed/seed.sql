DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS flights;

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    flight_number VARCHAR(20) NOT NULL,
    origin VARCHAR(50),
    destination VARCHAR(50),
    departure_time TIMESTAMP,
    arrival_time TIMESTAMP
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    flight_id INT REFERENCES flights(id) ON DELETE CASCADE,
    item_name VARCHAR(100),
    quantity INT
);

INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time)
VALUES
('AI101', 'DEL', 'MUM', NOW(), NOW() + INTERVAL '2 hours'),
('AI202', 'BLR', 'DEL', NOW(), NOW() + INTERVAL '2.5 hours'),
('AI303', 'HYD', 'MAA', NOW(), NOW() + INTERVAL '1.5 hours');

INSERT INTO inventory (flight_id, item_name, quantity)
VALUES
(1, 'Water Bottle', 120),
(1, 'Sandwich', 60),
(2, 'Soft Drinks', 90),
(2, 'Chips', 150),
(3, 'Tea Bags', 200);
