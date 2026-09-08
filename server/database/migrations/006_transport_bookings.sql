USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 006: Transport Bookings
-- ============================================================

CREATE TABLE IF NOT EXISTS transport_bookings (
    id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL,

    -- flight / train / bus / private_transport
    booking_type VARCHAR(50) NOT NULL,

    -- duffel / railway / provider name
    provider VARCHAR(100) NULL,

    -- External provider booking/order reference
    external_booking_id VARCHAR(150) NULL,

    -- TripDaoBD customer-facing reference
    reference_code VARCHAR(50) NOT NULL,

    -- Journey information
    origin VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    travel_date DATE NOT NULL,

    -- Service information
    service_name VARCHAR(200) NULL,
    service_number VARCHAR(100) NULL,

    departure_time DATETIME NULL,
    arrival_time DATETIME NULL,
    duration VARCHAR(100) NULL,

    -- Passenger information
    passenger_count INT NOT NULL DEFAULT 1,

    -- Pricing
    currency VARCHAR(10) NOT NULL DEFAULT 'BDT',
    base_fare DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    service_fee DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    -- Payment state
    payment_status VARCHAR(30) NOT NULL DEFAULT 'Pending',

    -- Booking lifecycle
    booking_status VARCHAR(30) NOT NULL DEFAULT 'Pending',

    -- Flexible provider data
    passenger_details JSON NULL,
    raw_provider_response JSON NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_transport_reference_code (reference_code),

    INDEX idx_transport_bookings_user (user_id),
    INDEX idx_transport_bookings_type (booking_type),
    INDEX idx_transport_bookings_provider (provider),
    INDEX idx_transport_bookings_external_id (external_booking_id),
    INDEX idx_transport_bookings_travel_date (travel_date),
    INDEX idx_transport_bookings_status (booking_status),
    INDEX idx_transport_bookings_payment_status (payment_status),

    CONSTRAINT fk_transport_bookings_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;