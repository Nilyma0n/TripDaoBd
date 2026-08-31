import db from "../config/db.js";

// =====================================================
// REQUIRE PERMISSION
// Checks whether the authenticated user has a specific
// RBAC permission.
// =====================================================

const requirePermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      // -------------------------------------------------
      // Make sure authentication already happened
      // -------------------------------------------------

      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      // -------------------------------------------------
      // Check permission through RBAC tables
      // -------------------------------------------------

      const [rows] = await db.execute(
        `
        SELECT DISTINCT p.id
        FROM user_roles ur
        JOIN role_permissions rp
          ON rp.role_id = ur.role_id
        JOIN permissions p
          ON p.id = rp.permission_id
        WHERE ur.user_id = ?
          AND p.name = ?
        LIMIT 1
        `,
        [req.user.id, permissionName]
      );

      // -------------------------------------------------
      // Permission denied
      // -------------------------------------------------

      if (rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action.",
          required_permission: permissionName,
        });
      }

      // -------------------------------------------------
      // Permission granted
      // -------------------------------------------------

      next();
    } catch (error) {
      console.error("Permission Check Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while checking permissions.",
      });
    }
  };
};

export default requirePermission;