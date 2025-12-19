import { Router } from "express";
import { createOrder, getAllOrder, getSingleOrder, putOrder, deleteOrder, getPhoto } from "../controller/orders.js";

const orderRouter = Router()

orderRouter.get("/orders/all", getAllOrder)
orderRouter.get("/orders/single/:id", getSingleOrder)
orderRouter.post("/orders", createOrder)
orderRouter.put("/orders/:id", putOrder)
orderRouter.delete("/orders/:id", deleteOrder)
orderRouter.get("/files/:food_photo", getPhoto )

export default orderRouter