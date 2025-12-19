import fileSystem from "../utility/fileSystem.js";


const createUser = (req, res)=> {
    const {name, phone} = req.body
    if(!name || name.length<2){
        return res.status(400).send({message: "Name to'liq emas!"})
    }
    let uz = (/^998(9[01345789]|3[3]|7[1]|8[8]|[5[5]])[0-9]{7}$/).test(phone)
    if(!uz || !phone){
        return res.status(400).send({message: "Telefon raqam invalid"})
    }
    let users = fileSystem.read("users")
    let existUser = users.find(user => user.phone === phone)
    if(existUser){
        return res.status(409).send({message: "Bu telefon raqam avval ishlatilgan"})
    }
    const newUser = { 
        id: users.length>0? users[users.length-1].id+1 : 1,
        name, 
        phone
    }
    users.push(newUser)
    fileSystem.write("users", users)
    return res.status(201).send({message:"User created succes"})
}

const getAllUsers = (req, res)=> {
    let users = fileSystem.read("users")
    return res.status(200).send(users)
}

const getSingleUser = (req, res)=> {
    let users = fileSystem.read("users")
    const {id} = req.params
    const userExists = users.find(user => user.id === parseInt(id))
    if(!userExists){
        return res.status(404).send({message: "Bu user mavjud emas"})
    }
    return res.status(200).send(userExists)
}

const deleteUser = (req, res)=> {
    let users = fileSystem.read("users")
    const {id} = req.params
    const userIndex = users.findIndex(user => user.id === parseInt(id))
    if(userIndex === -1){
        return res.status(404).send({message: "Bu user mavjud emas"})
    }
    users.splice(userIndex, 1)
    fileSystem.write("users", users)
    return res.status(200).send({message: "User delete success"})
}

const putUser = (req, res) =>{
    let users = fileSystem.read("users")
    const {id} = req.params
    const body = req.body
    const userIndex = users.findIndex(user => user.id === parseInt(id))
    if(userIndex === -1){
        return res.status(404).send({message: "Bu user mavjud emas"})
    }
    users[userIndex] = {...users[userIndex], ...body}
    fileSystem.write("users", users)
    return res.status(200).send({message: "User update success"})
}



export {createUser, getAllUsers, deleteUser, getSingleUser, putUser}