import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  loginUser,
} from "../controller/UserController.js";
import { UserDetailsValidator } from "../validators/UserDetailsValidator.js";
import { FetchUser } from "../middlewares/FetchUser.js";

const router = express.Router();

//? Signup API
router.post("/signup", UserDetailsValidator(), createUser);

//? Login API
router.post("/login", loginUser);

//? Get all users API
router.get("/getallusers", getAllUsers);

//? Get a user API
router.get("/getuser", FetchUser, getUser);

export default router;
