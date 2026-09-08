import bcrypt from "bcryptjs";
import db from "./config/db.js";

const email = "admin@tripdaobd.com";
const newPassword = "Admin@123";

try {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const [result] = await db.execute(
    `
    UPDATE users
    SET password = ?
    WHERE email = ?
    `,
    [hashedPassword, email]
  );

  if (result.affectedRows === 0) {
    console.log("User not found:", email);
    process.exit(1);
  }

  console.log("Password reset successful.");
  console.log("Email:", email);
  console.log("New password:", newPassword);

  process.exit(0);
} catch (error) {
  console.error("Password reset error:", error);
  process.exit(1);
}