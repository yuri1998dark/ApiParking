import { User } from "../models/sequelize/User.model.js";


export const getUser= async (req, res) => {
    const allUsers = await User.findAll();
  
    res.json(allUsers);
  };

  export const createUser= async (req, res) => {
    const { name } = req.body;
  
    try {
      const newUser = {
        name,
        
      };
  
      await User.create(newUser);
  
      res.status(200).json({ message: "create sucessfully" });
    } catch (error) {
      console.log(error);
    }
  };