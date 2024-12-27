import crypto from "crypto";
import Institution from "../database/models/institutional.model.js";

export function generateBlockchainHash(
  studentName,
  studentEmail,
  courseName,
  issuedAt
) {
  const data = `${studentName}${studentEmail}${courseName}${issuedAt}`;
  return crypto.createHash("sha256").update(data).digest("hex");
}
