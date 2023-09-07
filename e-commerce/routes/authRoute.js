import express from "express";
import{ registerController,logincontroller,testController} from "../controllers/authController.js";
import { requireSignIn ,isAdmin} from "../middlewares/authmiddleware.js";
const router = express.Router();
//register || post
router.post("/register",registerController);
router.post("/login",logincontroller)

//testroute
router.get("/test",requireSignIn,isAdmin,testController)
export default router;