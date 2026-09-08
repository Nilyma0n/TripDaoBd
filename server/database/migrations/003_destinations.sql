USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 003: Destinations Foundation
-- ============================================================

-- ------------------------------------------------------------
-- 1. DESTINATIONS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destinations (
    id INT NOT NULL AUTO_INCREMENT,

    slug VARCHAR(150) NOT NULL,
    name VARCHAR(150) NOT NULL,

    district VARCHAR(100) NOT NULL,
    division VARCHAR(100) NOT NULL,

    category ENUM(
        'Beach',
        'Hill',
        'Forest',
        'River',
        'Historical',
        'Island',
        'Lake',
        'Tea Garden',
        'Haor',
        'Nature',
        'Waterfall'
    ) NOT NULL,

    short_description VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,

    hero_image VARCHAR(500) DEFAULT NULL,

    latitude DECIMAL(10,7) DEFAULT NULL,
    longitude DECIMAL(10,7) DEFAULT NULL,

    map_url VARCHAR(1000) DEFAULT NULL,

    best_season VARCHAR(255) DEFAULT NULL,
    opening_hours VARCHAR(255) DEFAULT NULL,

    entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    estimated_duration VARCHAR(100) DEFAULT NULL,

    rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    total_reviews INT NOT NULL DEFAULT 0,

    featured TINYINT(1) NOT NULL DEFAULT 0,
    popular TINYINT(1) NOT NULL DEFAULT 0,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_destinations_slug (slug),

    KEY idx_destinations_district (district),
    KEY idx_destinations_division (division),
    KEY idx_destinations_category (category),
    KEY idx_destinations_featured (featured),
    KEY idx_destinations_popular (popular),

    KEY idx_destinations_location (division, district)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ------------------------------------------------------------
-- 2. DESTINATION IMAGES
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_images (
    id INT NOT NULL AUTO_INCREMENT,

    destination_id INT NOT NULL,

    image_url VARCHAR(500) NOT NULL,

    alt_text VARCHAR(255) DEFAULT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    KEY idx_destination_images_destination (
        destination_id
    ),

    CONSTRAINT fk_destination_images_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations (id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ------------------------------------------------------------
-- 3. DESTINATION HIGHLIGHTS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_highlights (
    id INT NOT NULL AUTO_INCREMENT,

    destination_id INT NOT NULL,

    highlight VARCHAR(255) NOT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    PRIMARY KEY (id),

    KEY idx_destination_highlights_destination (
        destination_id
    ),

    CONSTRAINT fk_destination_highlights_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations (id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ------------------------------------------------------------
-- 4. DESTINATION THINGS TO DO
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_activities (
    id INT NOT NULL AUTO_INCREMENT,

    destination_id INT NOT NULL,

    activity VARCHAR(255) NOT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    PRIMARY KEY (id),

    KEY idx_destination_activities_destination (
        destination_id
    ),

    CONSTRAINT fk_destination_activities_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations (id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ------------------------------------------------------------
-- 5. DESTINATION REVIEWS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS destination_reviews (
    id INT NOT NULL AUTO_INCREMENT,

    destination_id INT NOT NULL,

    user_id INT DEFAULT NULL,

    user_name VARCHAR(150) NOT NULL,

    rating DECIMAL(2,1) NOT NULL,

    comment TEXT NOT NULL,

    review_date DATE DEFAULT NULL,

    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    KEY idx_destination_reviews_destination (
        destination_id
    ),

    KEY idx_destination_reviews_user (
        user_id
    ),

    CONSTRAINT chk_destination_review_rating
        CHECK (rating >= 1.0 AND rating <= 5.0),

    CONSTRAINT fk_destination_reviews_destination
        FOREIGN KEY (destination_id)
        REFERENCES destinations (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_destination_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE SET NULL

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


-- ------------------------------------------------------------
-- MIGRATION VERIFICATION
-- ------------------------------------------------------------

SHOW TABLES;

DESCRIBE destinations;

DESCRIBE destination_images;

DESCRIBE destination_highlights;

DESCRIBE destination_activities;

DESCRIBE destination_reviews;