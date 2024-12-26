import { Router } from "express";
import userControllers from "../controller/user.controllers.js";
//1-DEFINE ENDPOITS E MANDA A REQUISIÇÃO PARA O CONTROLLER(QUE CRIA A RESPOSTA)

const router = Router();
//esta criando api post na rota users e passando o calback
router.post('/users', userControllers.createUserController)

export default router
