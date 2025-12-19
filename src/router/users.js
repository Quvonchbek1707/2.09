import { Router } from "express";
import { createUser, getAllUsers, getSingleUser, putUser, deleteUser } from "../controller/users.js";

const userRouter = Router()

userRouter.get("/users/all", getAllUsers)
userRouter.get("/users/single/:id", getSingleUser)
userRouter.post("/users", createUser)
userRouter.put("/users/:id", putUser)
userRouter.delete("/users/:id", deleteUser)

export default userRouter