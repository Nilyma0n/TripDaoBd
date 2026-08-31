import db from "../config/db.js";

// =====================================================
// CHECK USER ROLE
// Usage:
// router.get(
//   "/admin-only",
//   authMiddleware,
//   requireRole("admin"),
//   controller
// )
// =====================================================

export const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      const [rows] = await db.execute(
        `
        SELECT
          r.id,
          r.name AS role
        FROM user_roles ur
        JOIN roles r
          ON r.id = ur.role_id
        WHERE ur.user_id = ?
        ORDER BY r.id
        `,
        [req.user.id]
      );

      if (rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "No role assigned to this user.",
        });
      }

      const userRoles = rows.map((row) => row.role);

      const hasRole = userRoles.some((role) =>
        allowedRoles.includes(role)
      );

      if (!hasRole) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to access this resource.",
        });
      }

      // Store RBAC roles for later use
      req.user.roles = userRoles;

      next();
    } catch (error) {
      console.error("RBAC Role Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while checking user role.",
      });
    }
  };
};


// =====================================================
// CHECK USER PERMISSION
// Usage:
// router.post(
//   "/",
//   authMiddleware,
//   requirePermission("booking.create"),
//   controller
// )
// =====================================================

export const requirePermission = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      if (requiredPermissions.length === 0) {
        return next();
      }

      const placeholders = requiredPermissions
        .map(() => "?")
        .join(",");

      const [rows] = await db.execute(
        `
        SELECT DISTINCT
          p.id,
          p.name AS permission
        FROM user_roles ur
        JOIN role_permissions rp
          ON rp.role_id = ur.role_id
        JOIN permissions p
          ON p.id = rp.permission_id
        WHERE ur.user_id = ?
          AND p.name IN (${placeholders})
        ORDER BY p.id
        `,
        [req.user.id, ...requiredPermissions]
      );

      const userPermissions = rows.map(
        (row) => row.permission
      );

      const hasPermission = requiredPermissions.every(
        (permission) =>
          userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have permission to perform this action.",
        });
      }

      // Store permissions for later use
      req.user.permissions = userPermissions;

      next();
    } catch (error) {
      console.error("RBAC Permission Error:", error);

      return res.status(500).json({
        success: false,
        message:
          "Server error while checking permission.",
      });
    }
  };
};