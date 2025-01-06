import userServices from "../service/user.services.js";
import {loginService} from "../service/auth.service.js"
//2-RESPOSTA DA API

//aqui fica a função de callback da api
//req: dados recebidos, res: resposta 
async function createUserController(req, res) {
    const newUser = req.body; //dados recebido do usuario

    try {
        const token = await userServices.createUserService(newUser)
        res.status(201).send({token})
    } catch (err) {
        return res.status(400).send(err.message)
    }
}


async function loginUserController(req, res) {
    const {email, password} = req.body; //dados recebido do usuario

    try {
        const token = await loginService(email, password)
        res.send({token})
    } catch (err) {
        res.status(400).send(err.message)
    }
}




async function findAllUserController(req, res) {
try {
    const users = await userServices.findAllUserService()
    res.send({users})
} catch(e) {
    return res.status(400).send(e.message)
}
}



async function findUserByIdController(req, res) {
    const {id} = req.params

    try {
        const user = await userServices.findUserById(id)
        res.send({user})
    } catch(e){
        return res.status(400).send(e.message)
    }
}

async function updateUserController(req, res) {
    const {id} = req.params;
    const newUser = req.body;

    try{
        const user = await userServices.updateUserRepository(id, newUser)
        res.status(200).send({user})
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

async function deleteUserController(req, res) {
    const {id} = req.params;

    try{
        const message = await userServices.deleteUserService(id)
        res.send({message})
    }catch(e) {
        return res.status(400).send(e.message)
    }
}

export default {
    createUserController,
    findAllUserController,
    findUserByIdController,
    updateUserController,
    deleteUserController,
    loginUserController
}