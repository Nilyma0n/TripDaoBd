USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 007: Flight Seller Foundation
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_sellers (
    id INT NOT NULL AUTO_INCREMENT,

    -- TripDaoBD user account
    user_id INT NOT NULL,

    -- Seller business information
    business_name VARCHAR(200) NOT NULL,
    seller_type VARCHAR(50) NOT NULL DEFAULT 'travel_agency',

    contact_person VARCHAR(150) NULL,
    business_email VARCHAR(150) NULL,
    business_phone VARCHAR(50) NULL,

    -- Optional business information
    address VARCHAR(255) NULL,
    city VARCHAR(100) NULL,

    -- Seller verification
    verification_status VARCHAR(30) NOT NULL DEFAULT 'pending',

    -- Whether seller can currently publish/sell flights
    selling_enabled TINYINT(1) NOT NULL DEFAULT 0,

    -- Admin notes
    admin_notes TEXT NULL,

    -- Account status
    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_flight_seller_user (user_id),

    INDEX idx_flight_seller_business_name (business_name),
    INDEX idx_flight_seller_type (seller_type),
    INDEX idx_flight_seller_verification (verification_status),
    INDEX idx_flight_seller_enabled (selling_enabled),
    INDEX idx_flight_seller_active (is_active),

    CONSTRAINT fk_flight_seller_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;