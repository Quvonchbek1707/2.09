import fileSystem from "../utility/fileSystem.js";


const createFood = (req, res)=> {
    const {foodName, food_photo } = req.body
    if(!foodName || foodName.length<2){
        return res.status(400).send({message: "foodName to'liq emas!"})
    }
    let foods = fileSystem.read("foods")
    let existFood = foods.find(food => food.foodName === foodName)
    if(existFood){
        return res.status(409).send({message: "Bu nomli taom mavjud"})
    }
    const newfood = { 
        id: foods.length>0? foods[foods.length-1].id+1 : 1,
        foodName, 
        food_photo
    }
    foods.push(newfood)
    fileSystem.write("foods", foods)
    return res.status(201).send({message: "Food created"})
}

const getAllFood = (req, res)=> {
    let foods = fileSystem.read("foods")
    return res.status(200).send(foods)
}
const getSingleFood = (req, res)=> {
    let foods = fileSystem.read("foods")
    const {id} = req.params
    const foodExists = foods.find(food => food.id === parseInt(id))
    if(!foodExists){
        return res.status(404).send({message: "Bu food mavjud emas"})
    }
    return res.status(200).send(foodExists)
}
const deleteFood = (req, res)=> {
    let foods = fileSystem.read("foods")
    const {id} = req.params
    const foodIndex = foods.findIndex(food => food.id === parseInt(id))
    if(foodIndex === -1){
        return res.status(404).send({message: "Bu food mavjud emas"})
    }
    foods.splice(foodIndex, 1)
    fileSystem.write("foods", foods)
    return res.status(200).send({message: "food delete success"})
}
const putFood = (req, res) =>{
    let foods = fileSystem.read("foods")
    const {id} = req.params
    const body = req.body
    const foodIndex = foods.findIndex(food => food.id === parseInt(id))
    if(foodIndex === -1){
        return res.status(404).send({message: "Bu food mavjud emas"})
    }
    foods[foodIndex] = {...foods[foodIndex], ...body}
    fileSystem.write("foods", foods)
    return res.status(200).send({message: "food update success"})
}



export {createFood, getAllFood, deleteFood, getSingleFood, putFood}