import express from "express"
import { userRouter, foodsRouter, orderRouter } from "./src/router/router.js"

const app = express()
app.use(express.json())

app.use(userRouter)
app.use(orderRouter)
app.use(foodsRouter)

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})