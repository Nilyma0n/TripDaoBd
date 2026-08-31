USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 001: RBAC Foundation
-- ============================================================

-- ------------------------------------------------------------
-- 1. ROLES
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS roles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_roles_name (name)
);


-- ------------------------------------------------------------
-- 2. USER ROLES
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_roles (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_user_role (user_id, role_id),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ------------------------------------------------------------
-- 3. PERMISSIONS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS permissions (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uk_permissions_name (name)
);


-- ------------------------------------------------------------
-- 4. ROLE PERMISSIONS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS role_permissions (
    id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uk_role_permission (role_id, permission_id),

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ============================================================
-- INSERT SYSTEM ROLES
-- ============================================================

INSERT IGNORE INTO roles
    (name, description)
VALUES
    ('traveler', 'Regular TripDaoBD traveler and customer'),
    ('travel_host', 'User who creates and manages hosted trips'),
    ('hotel', 'Hotel/accommodation service provider'),
    ('restaurant', 'Restaurant service provider'),
    ('transportation', 'Transportation service provider'),
    ('emergency_provider', 'Emergency service provider'),
    ('photographer', 'Travel photographer/service provider'),
    ('admin', 'TripDaoBD administrator'),
    ('super_admin', 'Full TripDaoBD system administrator');


-- ============================================================
-- INSERT BASIC PERMISSIONS
-- ============================================================

INSERT IGNORE INTO permissions
    (name, description)
VALUES

    ('profile.view', 'View own profile'),
    ('profile.update', 'Update own profile'),

    ('booking.view_own', 'View own bookings'),
    ('booking.create', 'Create bookings'),
    ('booking.cancel_own', 'Cancel own bookings'),

    ('payment.view_own', 'View own payments'),
    ('payment.create', 'Create payments'),

    ('notification.view_own', 'View own notifications'),

    ('trip.create', 'Create hosted trips'),
    ('trip.manage_own', 'Manage own hosted trips'),

    ('hotel.manage', 'Manage hotel services'),
    ('restaurant.manage', 'Manage restaurant services'),

    ('transportation.manage', 'Manage transportation services'),

    ('emergency.manage', 'Manage emergency services'),

    ('photographer.manage', 'Manage photography services'),

    ('booking.manage_provider', 'Manage bookings belonging to provider'),

    ('payment.view_provider', 'View provider payment information'),
    ('report.view_provider', 'View provider reports'),

    ('user.manage', 'Manage users'),
    ('provider.verify', 'Verify service providers'),
    ('system.manage', 'Manage system settings');


-- ============================================================
-- TRAVELER ROLE PERMISSIONS
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'traveler'
AND p.name IN (
    'profile.view',
    'profile.update',
    'booking.view_own',
    'booking.create',
    'booking.cancel_own',
    'payment.view_own',
    'payment.create',
    'notification.view_own'
);


-- ============================================================
-- TRAVEL HOST ROLE PERMISSIONS
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'travel_host'
AND p.name IN (
    'profile.view',
    'profile.update',
    'booking.view_own',
    'payment.view_own',
    'notification.view_own',
    'trip.create',
    'trip.manage_own',
    'booking.manage_provider',
    'payment.view_provider',
    'report.view_provider'
);


-- ============================================================
-- HOTEL ROLE PERMISSIONS
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'hotel'
AND p.name IN (
    'profile.view',
    'profile.update',
    'notification.view_own',
    'hotel.manage',
    'booking.manage_provider',
    'payment.view_provider',
    'report.view_provider'
);


-- ============================================================
-- RESTAURANT ROLE PERMISSIONS
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'restaurant'
AND p.name IN (
    'profile.view',
    'profile.update',
    'notification.view_own',
    'restaurant.manage',
    'booking.manage_provider',
    'payment.view_provider',
    'report.view_provider'
);


-- ============================================================
-- TRANSPORTATION ROLE PERMISSIONS
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'transportation'
AND p.name IN (
    'profile.view',
    'profile.update',
    'notification.view_own',
    'transportation.manage',
    'booking.manage_provider',
    'payment.view_provider',
    'report.view_provider'
);


-- ============================================================
-- EMERGENCY PROVIDER
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'emergency_provider'
AND p.name IN (
    'profile.view',
    'profile.update',
    'notification.view_own',
    'emergency.manage',
    'report.view_provider'
);


-- ============================================================
-- PHOTOGRAPHER
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'photographer'
AND p.name IN (
    'profile.view',
    'profile.update',
    'notification.view_own',
    'photographer.manage',
    'booking.manage_provider',
    'payment.view_provider',
    'report.view_provider'
);


-- ============================================================
-- ADMIN
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
WHERE r.name = 'admin'
AND p.name IN (
    'profile.view',
    'profile.update',
    'user.manage',
    'provider.verify',
    'report.view_provider'
);


-- ============================================================
-- SUPER ADMIN
-- ============================================================

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'super_admin';