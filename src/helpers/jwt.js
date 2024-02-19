import jwt from "jsonwebtoken";


export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};