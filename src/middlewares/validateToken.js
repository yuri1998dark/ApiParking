import jwt from "jsonwebtoken";


export const authRequired = (req, res, next) => {
  console.log(req.params)
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  
 

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
       
      req.user = user;
      console.log(req.user)
      next();
    });
};