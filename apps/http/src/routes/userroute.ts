import express, { Router } from "express";
import { createUser, signInUser } from "../controller/usercontroller.js";
const router:Router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signInUser);

export default router;
