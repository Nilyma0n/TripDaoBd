USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 011: Flight Bookings
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_bookings (
    id INT NOT NULL AUTO_INCREMENT,

    -- Traveler
    user_id INT NOT NULL,

    -- Seller
    seller_id INT NOT NULL,

    -- Flight inventory / schedule
    inventory_id INT NOT NULL,
    schedule_id INT NOT NULL,

    -- Customer-facing booking reference
    reference_code VARCHAR(50) NOT NULL,

    -- Passenger information
    passenger_count INT NOT NULL DEFAULT 1,
    passenger_details JSON NULL,

    -- Booking price snapshot
    currency VARCHAR(10) NOT NULL DEFAULT 'BDT',
    price_per_seat DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    base_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    service_fee DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    -- Payment
    payment_status VARCHAR(30) NOT NULL DEFAULT 'Pending',

    -- Booking lifecycle
    booking_status VARCHAR(30) NOT NULL DEFAULT 'Pending',

    -- Seller/admin notes
    seller_notes TEXT NULL,
    admin_notes TEXT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_flight_booking_reference (
        reference_code
    ),

    INDEX idx_flight_booking_user (user_id),
    INDEX idx_flight_booking_seller (seller_id),
    INDEX idx_flight_booking_inventory (inventory_id),
    INDEX idx_flight_booking_schedule (schedule_id),
    INDEX idx_flight_booking_payment (payment_status),
    INDEX idx_flight_booking_status (booking_status),

    CONSTRAINT fk_flight_booking_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_flight_booking_seller
        FOREIGN KEY (seller_id)
        REFERENCES flight_sellers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_flight_booking_inventory
        FOREIGN KEY (inventory_id)
        REFERENCES flight_inventory(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_flight_booking_schedule
        FOREIGN KEY (schedule_id)
        REFERENCES flight_schedules(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;