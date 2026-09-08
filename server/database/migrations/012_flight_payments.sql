USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 012: Flight Payments
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_payments (
    id INT NOT NULL AUTO_INCREMENT,

    -- Flight booking
    flight_booking_id INT NOT NULL,

    -- Traveler
    user_id INT NOT NULL,

    -- Payment information
    amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('bkash','nagad','card','bank') NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,

    -- Payment lifecycle
    payment_status ENUM(
        'Pending',
        'Paid',
        'Failed',
        'Refunded'
    ) NOT NULL DEFAULT 'Pending',

    paid_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_flight_payment_transaction (
        transaction_id
    ),

    INDEX idx_flight_payment_booking (
        flight_booking_id
    ),

    INDEX idx_flight_payment_user (
        user_id
    ),

    INDEX idx_flight_payment_status (
        payment_status
    ),

    CONSTRAINT fk_flight_payment_booking
        FOREIGN KEY (flight_booking_id)
        REFERENCES flight_bookings(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_flight_payment_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
