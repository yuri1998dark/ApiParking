import User from "../models/sequelize/User.model.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../helpers/jwt.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  //de la peticion extrae del body los parametros
  const { email, password, name,phone } = req.body;
  
  try {
    const userFound = await User.findOne({ where:{email}  });
    if (userFound) return res.status(400).json(["Emails already exists"]);

    //hash para encriptar el password
    const passhash = await bcryptjs.hash(password, 10);
    //crea un nuevo usuario y lo almacena en la base de datos
    const newUser = new User({
      name,
      email,
      password: passhash,
      phone,
    });

    const userSaved = await newUser.save();

    console.log(userSaved);
    const token = await createAccessToken({ id:userSaved.id });
    console.log(token);
    res.cookie("token", token, { sameSite: "none" });
    res.send("Sucess");

    //res.json(userSaved)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const userFound = await User.findOne({where:{email} });
    console.log(userFound)
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token);
   
    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });

    //res.json(userSaved)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
    console.log(req.user);
    const userFound = await User.findByPk(req.user.id);
    
  if (!userFound) return res.status(400).json({ message: "User not found" });
  res.json({
    id: userFound.id,
    username: userFound.name,
    email: userFound.email,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.SECRETKEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unathorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound.id,
      username: userFound.name,
      email: userFound.email,
    });
  });
};
