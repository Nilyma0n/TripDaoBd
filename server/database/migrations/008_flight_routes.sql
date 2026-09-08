USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 008: Flight Routes
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_routes (
    id INT NOT NULL AUTO_INCREMENT,

    -- Flight seller / agency
    seller_id INT NOT NULL,

    -- Airport / route information
    origin_code VARCHAR(10) NOT NULL,
    origin_name VARCHAR(150) NOT NULL,

    destination_code VARCHAR(10) NOT NULL,
    destination_name VARCHAR(150) NOT NULL,

    -- Airline information
    airline_name VARCHAR(150) NOT NULL,
    airline_code VARCHAR(20) NULL,

    -- Optional flight number
    flight_number VARCHAR(50) NULL,

    -- Route status
    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_flight_routes_seller (seller_id),
    INDEX idx_flight_routes_origin (origin_code),
    INDEX idx_flight_routes_destination (destination_code),
    INDEX idx_flight_routes_airline (airline_name),
    INDEX idx_flight_routes_active (is_active),

    CONSTRAINT fk_flight_routes_seller
        FOREIGN KEY (seller_id)
        REFERENCES flight_sellers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;