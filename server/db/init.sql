-- Create DB schema and sample data (flights 1..3 and inventories)

-- Create flights table
CREATE TABLE IF NOT EXISTS flights (
  id SERIAL PRIMARY KEY,
  flight_number VARCHAR(30) NOT NULL,
  origin VARCHAR(10) NOT NULL,
  destination VARCHAR(10) NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE,
  arrival_time TIMESTAMP WITH TIME ZONE
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  flight_id INTEGER NOT NULL REFERENCES flights(id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  trolley_id INTEGER,
  drawer_id INTEGER
);

-- Insert sample flights
INSERT INTO flights (id, flight_number, origin, destination, departure_time, arrival_time)
VALUES
  (1, 'AI101', 'DEL', 'MUM', '2025-12-05T03:31:36Z', '2025-12-05T05:31:36Z'),
  (2, 'AI202', 'BLR', 'DEL', '2025-12-05T03:31:36Z', '2025-12-05T06:01:36Z'),
  (3, 'AI303', 'HYD', 'MAA', '2025-12-05T03:31:36Z', '2025-12-05T05:01:36Z')
ON CONFLICT DO NOTHING;

-- Insert sample inventory (for flights 1..3)
INSERT INTO inventory (flight_id, item_name, quantity, trolley_id, drawer_id) VALUES
  (1, 'ok2', 500, 2, NULL),
  (1, 'hello 1', 7, 1, NULL),
  (1, 'tetsinggg', 2, 1, NULL),
  (1, 'pll', 2, 2, NULL),

  -- sample items for flight 2
  (2, 'water bottles', 100, 1, NULL),
  (2, 'snacks', 50, 2, NULL),

  -- sample items for flight 3
  (3, 'blankets', 30, 1, NULL),
  (3, 'headsets', 20, 3, NULL);
