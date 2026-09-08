USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 010: Flight Inventory & Pricing
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_inventory (
    id INT NOT NULL AUTO_INCREMENT,

    -- Flight schedule
    schedule_id INT NOT NULL,

    -- Cabin / fare class
    cabin_class VARCHAR(30) NOT NULL DEFAULT 'economy',

    -- Seat inventory
    total_seats INT NOT NULL DEFAULT 0,
    available_seats INT NOT NULL DEFAULT 0,
    booked_seats INT NOT NULL DEFAULT 0,

    -- Pricing
    currency VARCHAR(10) NOT NULL DEFAULT 'BDT',
    price_per_seat DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    -- Seller controls
    selling_enabled TINYINT(1) NOT NULL DEFAULT 1,

    -- Inventory status
    status VARCHAR(30) NOT NULL DEFAULT 'available',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_schedule_cabin (
        schedule_id,
        cabin_class
    ),

    INDEX idx_flight_inventory_schedule (schedule_id),
    INDEX idx_flight_inventory_cabin (cabin_class),
    INDEX idx_flight_inventory_available (available_seats),
    INDEX idx_flight_inventory_status (status),
    INDEX idx_flight_inventory_selling (selling_enabled),

    CONSTRAINT fk_flight_inventory_schedule
        FOREIGN KEY (schedule_id)
        REFERENCES flight_schedules(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;