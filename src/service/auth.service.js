
//REGRAS DE AUTENTICAÇÃO

import jwt from "jsonwebtoken" //biblioteca para criar token de algum dado
import 'dotenv/config' //usar variaveis de ambiente
import userRepositories from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt'


function generateJWT(id) {
    return jwt.sign({id:id},
        process.env.SECRET_JWT,
        {expiresIn:86400} 
    );
}

//busca os dados do usuario no db e retorna os dados 
async function loginService(email, password) {
    const user = await userRepositories.findUserByEmailRepository(email) 
    if(!user) throw new Error("Invalid user!") //se existir nao existir
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) throw new Error("invalid user!");
    return generateJWT(user.id)
    
}


export {generateJWT, loginService}