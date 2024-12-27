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

export function generateAuthenticationToken() {
  const randomId = Math.floor(Math.random() * 1000000) + 1;

  const token = jwt.sign({ id: randomId }, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

  return token;
}
