import { User } from "../models/user.js";


export const getUser= async (req, res) => {
    const allProjects = await Project.findAll();
  
    res.json(allProjects);
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