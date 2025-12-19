import { Router } from "express";
import { createFood, getAllFood, getSingleFood, putFood, deleteFood } from "../controller/foods.js";

const foodsRouter = Router()

foodsRouter.get("/foods/all", getAllFood)
foodsRouter.get("/foods/single/:id", getSingleFood)
foodsRouter.post("/foods", createFood)
foodsRouter.put("/foods/:id", putFood)
foodsRouter.delete("/foods/:id", deleteFood)

export default foodsRouter