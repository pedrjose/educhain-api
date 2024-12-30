import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function comparePasswords(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}