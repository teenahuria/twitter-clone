import express from "express";
import { follow, getMyProfile, getOtherUsers, logout, Register, unfollow } from "../controllers/userController.js";
import { Login } from "../controllers/userController.js";   
import isAuthenticated from "../config/auth.js";

import { bookmarks, getBookmarks } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout",logout);
router.put("/bookmarks/:id",isAuthenticated,bookmarks);
router.get("/profile/:id",isAuthenticated,getMyProfile);
router.get("/otheruser/:id",isAuthenticated,getOtherUsers);
router.post("/follow/:id",isAuthenticated,follow);
router.post("/unfollow/:id",isAuthenticated,unfollow);

router.get("/bookmarks/:id", isAuthenticated, getBookmarks);


export default router;
