import { Router } from "express";
import {getUser,createUser
 
} from "../controllers/projects.controller.js";
const router = Router();

router.get("/projects", getUser);
router.post("/projects", createUser);

export default router;