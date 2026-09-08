USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 009: Flight Schedules
-- ============================================================

CREATE TABLE IF NOT EXISTS flight_schedules (
    id INT NOT NULL AUTO_INCREMENT,

    -- Route
    route_id INT NOT NULL,

    -- Flight date/time
    departure_date DATE NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,

    -- Flight duration
    duration_minutes INT NULL,

    -- Schedule status
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',

    -- Whether travelers can see/book this schedule
    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    INDEX idx_flight_schedule_route (route_id),
    INDEX idx_flight_schedule_date (departure_date),
    INDEX idx_flight_schedule_status (status),
    INDEX idx_flight_schedule_active (is_active),

    CONSTRAINT fk_flight_schedule_route
        FOREIGN KEY (route_id)
        REFERENCES flight_routes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;