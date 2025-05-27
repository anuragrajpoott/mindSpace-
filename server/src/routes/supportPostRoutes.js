import express from "express";
import {

 
  createSupportPost,

} from "../controllers/supportPostController.js";
import {authenticateUser} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Support posts routes
router.post("/", authenticateUser, createSupportPost);


export default router;
