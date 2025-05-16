CREATE DATABASE IF NOT EXISTS fuel_management;
USE fuel_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'vehicle_owner', 'fuel_station_owner', 'operator') NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    chassis_number VARCHAR(50) NOT NULL UNIQUE,
    owner_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    qr_code TEXT NOT NULL,
    fuel_quota DECIMAL(10, 2) NOT NULL DEFAULT 50.00,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE fuel_stations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    fuel_station_id INT NOT NULL,
    pumped_litres DECIMAL(10, 2) NOT NULL,
    remaining_quota DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (fuel_station_id) REFERENCES fuel_stations(id)
);

CREATE TABLE mock_dmt (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    chassis_number VARCHAR(50) NOT NULL UNIQUE,
    owner_name VARCHAR(100) NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE
);

-- Insert sample data
INSERT INTO users (username, password, role, email, phone) VALUES
('admin1', '$2b$10$examplehashedpassword', 'admin', 'admin@fuelapp.com', NULL),
('owner1', '$2b$10$examplehashedpassword', 'vehicle_owner', 'owner1@fuelapp.com', '+1234567890'),
('station1', '$2b$10$examplehashedpassword', 'fuel_station_owner', 'station1@fuelapp.com', NULL),
('operator1', '$2b$10$examplehashedpassword', 'operator', 'operator1@fuelapp.com', NULL);

INSERT INTO vehicles (vehicle_number, chassis_number, owner_name, phone, qr_code, fuel_quota, user_id) VALUES
('ABC123', 'CH123456', 'John Doe', '+1234567890', 'data:image/png;base64,example', 50.00, 2),
('XYZ789', 'CH789012', 'Jane Smith', '+1234567891', 'data:image/png;base64,example', 50.00, 2);

INSERT INTO fuel_stations (name, owner_name, address, user_id) VALUES
('City Fuel', 'Alice Brown', '123 Main St, City', 3),
('Highway Pump', 'Bob Wilson', '456 Highway Rd, Town', 3);

INSERT INTO transactions (vehicle_id, fuel_station_id, pumped_litres, remaining_quota) VALUES
(1, 1, 10.00, 40.00),
(2, 1, 5.00, 45.00);

INSERT INTO mock_dmt (vehicle_number, chassis_number, owner_name, is_valid) VALUES
('ABC123', 'CH123456', 'John Doe', TRUE),
('XYZ789', 'CH789012', 'Jane Smith', TRUE),
('INVALID123', 'CH999999', 'Invalid User', FALSE);