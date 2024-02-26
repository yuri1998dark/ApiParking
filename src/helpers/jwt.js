import jwt from "jsonwebtoken";


export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRETKEY, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};