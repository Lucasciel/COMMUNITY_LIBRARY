import userServices from "../service/user.services.js";
//2-RESPOSTA DA API

//aqui fica a função de callback da api
//req: dados recebidos, res: resposta 
async function createUserController(req, res) {
    const newUser = req.body; //dados recebido do usuario

    try {
        const user = await userServices.createUserService(newUser)
        res.status(201).send({user})
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

export default {
    createUserController
}