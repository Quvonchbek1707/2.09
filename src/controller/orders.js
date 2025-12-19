import fileSystem from "../utility/fileSystem.js";
import path from "path"


const createOrder = (req, res)=> {
    const {userId, foodId, count} = req.body
    if(!userId || !foodId || !count){
        return res.status(400).send({message: "Invalid input"})
    }
    if(userId.Math.floor()!=userId || foodId.Math.floor()!=foodId || count!=count.Math.floor() ||userId<1 || foodId<1 || count<1){
        return res.status(400).send({message:"butun musbat son kiriting"})
    }
    let order = fileSystem.read("orders")
    const newOrder = { 
        id: order.length>0? order[order.length-1].id+1 : 1,
        userId, 
        foodId,
        count
    }
    order.push(newOrder)
    fileSystem.write("orders", order)
    return res.status(201).send({message: "Order created"})
}

const getAllOrder = (req, res)=> {
    let order = fileSystem.read("orders")
    return res.status(200).send(order)
}

const getSingleOrder = (req, res)=> {
    let order = fileSystem.read("orders")
    let foods = fileSystem.read("foods")
    const {id} = req.params
    const OrderExists = order.find(Order => Order.id === parseInt(id))
    if(!OrderExists){
        return res.status(404).send({message: "Bu Order mavjud emas"})
    }
    OrderExists.foodData = foods.find(food=> food.id === OrderExists.foodId)
    delete OrderExists.foodId
    OrderExists.foodData.food_photo = path.join(process.cwd(), "img", `${OrderExists.foodData.food_photo}`)
    return res.status(200).send(OrderExists)
}
const getPhoto = (req, res)=>{
    const {food_photo} = req.params
    if(!food_photo || food_photo.length<1){
        return res.status(404).send("photo not found")
    }
    return res.status(200).sendFile(path.join(process.cwd(), "img", `${food_photo}`))
}

const deleteOrder = (req, res)=> {
    let order = fileSystem.read("orders")
    const {id} = req.params
    const OrderIndex = order.findIndex(Order => Order.id === parseInt(id))
    if(OrderIndex === -1){
        return res.status(404).send({message: "Bu Order mavjud emas"})
    }
    order.splice(OrderIndex, 1)
    fileSystem.write("orders", order)
    return res.status(200).send({message: "Order delete success"})
}

const putOrder = (req, res) =>{
    let order = fileSystem.read("orders")
    const {id} = req.params
    const body = req.body
    const OrderIndex = order.findIndex(Order => Order.id === parseInt(id))
    if(OrderIndex === -1){
        return res.status(404).send({message: "Bu Order mavjud emas"})
    }
    order[OrderIndex] = {...order[OrderIndex], ...body}
    fileSystem.write("orders", order)
    return res.status(200).send({message: "Order update success"})
}



export {createOrder, getAllOrder, deleteOrder, getSingleOrder, putOrder, getPhoto}