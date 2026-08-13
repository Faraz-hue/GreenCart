import express from "express";
import userController from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/is-auth", authUser, userController.isAuth);
userRouter.get("/logout", userController.logout);


export default userRouter;