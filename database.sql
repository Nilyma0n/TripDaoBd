USE tripdaobd;

-- =====================================================
-- DESTINATIONS
-- =====================================================

CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,

  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,

  district VARCHAR(150) NOT NULL,
  division VARCHAR(150) NOT NULL,

  category VARCHAR(100) NOT NULL,

  short_description VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,

  hero_image VARCHAR(500) NULL,

  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,

  map_url VARCHAR(500) NULL,

  best_season VARCHAR(150) NULL,
  opening_hours VARCHAR(150) NULL,

  entry_fee DECIMAL(10,2) NOT NULL DEFAULT 0,

  estimated_duration VARCHAR(100) NULL,

  rating DECIMAL(3,2) NOT NULL DEFAULT 0,
  total_reviews INT NOT NULL DEFAULT 0,

  featured BOOLEAN NOT NULL DEFAULT FALSE,
  popular BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_destinations_district (district),
  INDEX idx_destinations_division (division),
  INDEX idx_destinations_category (category),
  INDEX idx_destinations_featured (featured),
  INDEX idx_destinations_popular (popular)
);

-- =====================================================
-- DESTINATION IMAGES
-- =====================================================

CREATE TABLE IF NOT EXISTS destination_images (
  id INT AUTO_INCREMENT PRIMARY KEY,

  destination_id INT NOT NULL,

  image_url VARCHAR(500) NOT NULL,

  display_order INT NOT NULL DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_destination_images_destination_id (destination_id),

  CONSTRAINT fk_destination_images_destination
    FOREIGN KEY (destination_id)
    REFERENCES destinations(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- =====================================================
-- DESTINATION HIGHLIGHTS
-- =====================================================

CREATE TABLE IF NOT EXISTS destination_highlights (
  id INT AUTO_INCREMENT PRIMARY KEY,

  destination_id INT NOT NULL,

  highlight VARCHAR(255) NOT NULL,

  display_order INT NOT NULL DEFAULT 0,

  INDEX idx_destination_highlights_destination_id (destination_id),

  CONSTRAINT fk_destination_highlights_destination
    FOREIGN KEY (destination_id)
    REFERENCES destinations(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- =====================================================
-- DESTINATION ACTIVITIES
-- =====================================================

CREATE TABLE IF NOT EXISTS destination_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,

  destination_id INT NOT NULL,

  activity VARCHAR(255) NOT NULL,

  display_order INT NOT NULL DEFAULT 0,

  INDEX idx_destination_activities_destination_id (destination_id),

  CONSTRAINT fk_destination_activities_destination
    FOREIGN KEY (destination_id)
    REFERENCES destinations(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);