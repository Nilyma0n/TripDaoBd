import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import db from "../config/db.js";

// =====================================================
// REGISTER USER
// New users automatically receive the "traveler" role.
// =====================================================

export const registerUser = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { full_name, email, phone, password } = req.body;

    const cleanName = full_name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone?.trim() || null;

    // -------------------------------------------------
    // Check if email already exists
    // -------------------------------------------------

    const [existingUsers] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // -------------------------------------------------
    // Find default RBAC role
    // -------------------------------------------------

    const [roles] = await connection.execute(
      `SELECT id
       FROM roles
       WHERE name = 'traveler'
       LIMIT 1`
    );

    if (roles.length === 0) {
      return res.status(500).json({
        success: false,
        message: "Default traveler role is not configured.",
      });
    }

    const travelerRoleId = roles[0].id;

    // -------------------------------------------------
    // Hash password
    // -------------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -------------------------------------------------
    // Start transaction
    // -------------------------------------------------

    await connection.beginTransaction();

    // -------------------------------------------------
    // Create user
    // -------------------------------------------------

    const [result] = await connection.execute(
      `INSERT INTO users
      (full_name, email, phone, password)
      VALUES (?, ?, ?, ?)`,
      [
        cleanName,
        cleanEmail,
        cleanPhone,
        hashedPassword,
      ]
    );

    const userId = result.insertId;

    // -------------------------------------------------
    // Assign traveler role
    // -------------------------------------------------

    await connection.execute(
      `INSERT INTO user_roles
      (user_id, role_id)
      VALUES (?, ?)`,
      [userId, travelerRoleId]
    );

    // -------------------------------------------------
    // Commit transaction
    // -------------------------------------------------

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: userId,
        full_name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        roles: ["traveler"],
      },
    });
  } catch (error) {
    // Only rollback if transaction has actually started
    try {
      await connection.rollback();
    } catch {
      // Ignore rollback errors
    }

    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  } finally {
    connection.release();
  }
};

// =====================================================
// LOGIN USER
// Loads RBAC roles and permissions.
// =====================================================

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();

    // -------------------------------------------------
    // Find user
    // -------------------------------------------------

    const [users] = await db.execute(
      `SELECT
        id,
        full_name,
        email,
        phone,
        password,
        profile_image,
        is_verified
       FROM users
       WHERE email = ?`,
      [cleanEmail]
    );

    // -------------------------------------------------
    // User not found
    // -------------------------------------------------

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = users[0];

    // -------------------------------------------------
    // Verify password
    // -------------------------------------------------

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // -------------------------------------------------
    // Load RBAC roles
    //
    // IMPORTANT:
    // MySQL 8 strict mode requires r.id to be included
    // because we use DISTINCT and ORDER BY r.id.
    // -------------------------------------------------

    const [roleRows] = await db.execute(
      `SELECT DISTINCT
        r.id,
        r.name AS role
       FROM user_roles ur
       JOIN roles r
         ON r.id = ur.role_id
       WHERE ur.user_id = ?
       ORDER BY r.id`,
      [user.id]
    );

    const roles = roleRows.map(
      (row) => row.role
    );

    // -------------------------------------------------
    // Safety check
    // -------------------------------------------------

    if (roles.length === 0) {
      return res.status(403).json({
        success: false,
        message: "No RBAC role assigned to this user.",
      });
    }

    // -------------------------------------------------
    // Load RBAC permissions
    //
    // IMPORTANT:
    // p.id is included because of DISTINCT + ORDER BY.
    // -------------------------------------------------

    const [permissionRows] = await db.execute(
      `SELECT DISTINCT
        p.id,
        p.name AS permission
       FROM user_roles ur
       JOIN role_permissions rp
         ON rp.role_id = ur.role_id
       JOIN permissions p
         ON p.id = rp.permission_id
       WHERE ur.user_id = ?
       ORDER BY p.id`,
      [user.id]
    );

    const permissions = permissionRows.map(
      (row) => row.permission
    );

    // -------------------------------------------------
    // Create JWT
    //
    // IMPORTANT:
    // We no longer use the old users.role field.
    // RBAC roles come from user_roles.
    // -------------------------------------------------

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roles,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // -------------------------------------------------
    // Never expose password
    // -------------------------------------------------

    delete user.password;

    // -------------------------------------------------
    // Return authenticated user
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        ...user,
        roles,
        permissions,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { full_name, phone } = req.body;

    const cleanName = full_name.trim();
    const cleanPhone = phone?.trim() || null;

    // -------------------------------------------------
    // Update user
    // -------------------------------------------------

    const [result] = await db.execute(
      `UPDATE users
       SET full_name = ?,
           phone = ?
       WHERE id = ?`,
      [
        cleanName,
        cleanPhone,
        req.user.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -------------------------------------------------
    // Get updated user
    // -------------------------------------------------

    const [users] = await db.execute(
      `SELECT
        id,
        full_name,
        email,
        phone,
        profile_image,
        is_verified
       FROM users
       WHERE id = ?`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // -------------------------------------------------
    // Get RBAC roles
    // -------------------------------------------------

    const [roleRows] = await db.execute(
      `SELECT DISTINCT
        r.id,
        r.name AS role
       FROM user_roles ur
       JOIN roles r
         ON r.id = ur.role_id
       WHERE ur.user_id = ?
       ORDER BY r.id`,
      [req.user.id]
    );

    const roles = roleRows.map(
      (row) => row.role
    );

    // -------------------------------------------------
    // Load RBAC permissions
    //
    // IMPORTANT:
    // Use req.user.id, NOT user.id.
    // There is no "user" variable in this function.
    // -------------------------------------------------

    const [permissionRows] = await db.execute(
      `SELECT DISTINCT
        p.id,
        p.name AS permission
       FROM user_roles ur
       JOIN role_permissions rp
         ON rp.role_id = ur.role_id
       JOIN permissions p
         ON p.id = rp.permission_id
       WHERE ur.user_id = ?
       ORDER BY p.id`,
      [req.user.id]
    );

    const permissions = permissionRows.map(
      (row) => row.permission
    );

    // -------------------------------------------------
    // Return updated user
    // -------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        ...users[0],
        roles,
        permissions,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating profile.",
    });
  }
};