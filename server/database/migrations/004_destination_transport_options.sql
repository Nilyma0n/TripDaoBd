USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 004: Destination Transport / How To Get There
-- ============================================================

CREATE TABLE IF NOT EXISTS destination_transport_options (
    id INT NOT NULL AUTO_INCREMENT,

    destination_id INT NOT NULL,

    transport_type VARCHAR(50) NOT NULL,
    title VARCHAR(150) NOT NULL,

    description TEXT NULL,

    estimated_time VARCHAR(100) NULL,

    estimated_cost_min DECIMAL(10,2) NULL,
    estimated_cost_max DECIMAL(10,2) NULL,

    instruction TEXT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_destination_transport_destination (
        destination_id
    ),

    INDEX idx_destination_transport_type (
        transport_type
    ),

    INDEX idx_destination_transport_active (
        is_active
    ),

    CONSTRAINT fk_destination_transport_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;