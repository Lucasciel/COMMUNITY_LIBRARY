//1-DEFINE ENDPOITS E MANDA A REQUISIÇÃO PARA O CONTROLLER(QUE CRIA A RESPOSTA)

//imports
import { Router } from "express";
import userControllers from "../controller/user.controllers.js";
import { validate, validateUserId } from "../middlewares/validation.middlewares.js"; //comparação e validação dos tipos
import { userSchema } from "../schema/user.schema.js"; //padrão do tipos dos dados
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
//esta criando api post na rota users e passando o middleware e calback
router.post('/users',validate(userSchema), userControllers.createUserController)


router.post('/users/login', userControllers.loginUserController)


router.use(authMiddleware); //protegendo todas as requisições abaixo
//pegar todos dados users
router.get('/users', userControllers.findAllUserController)

//pegar apenas usiario especifico
router.get('/users/:id',validateUserId, userControllers.findUserByIdController)

router.patch('/users/:id',validateUserId, userControllers.updateUserController)

router.delete('/users/:id',validateUserId, userControllers.deleteUserController)



export default router
