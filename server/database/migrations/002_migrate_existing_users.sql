USE tripdaobd;

-- ============================================================
-- TRIPDAOBD
-- Migration 002: Migrate Existing Users to RBAC
-- ============================================================

-- ------------------------------------------------------------
-- 1. Map legacy normal users to traveler role
-- ------------------------------------------------------------

INSERT IGNORE INTO user_roles (user_id, role_id)
SELECT
    u.id,
    r.id
FROM users u
JOIN roles r
    ON r.name = 'traveler'
WHERE u.role = 'user';


-- ------------------------------------------------------------
-- 2. Map legacy admin users to admin role
-- ------------------------------------------------------------

INSERT IGNORE INTO user_roles (user_id, role_id)
SELECT
    u.id,
    r.id
FROM users u
JOIN roles r
    ON r.name = 'admin'
WHERE u.role = 'admin';


-- ------------------------------------------------------------
-- Migration verification
-- ------------------------------------------------------------

SELECT
    u.id,
    u.full_name,
    u.email,
    u.role AS legacy_role,
    r.name AS rbac_role
FROM users u
LEFT JOIN user_roles ur
    ON ur.user_id = u.id
LEFT JOIN roles r
    ON r.id = ur.role_id
ORDER BY u.id;