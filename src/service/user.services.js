import userRepositories from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt' //biblioteca para criptografar dados do usuario
import {generateJWT} from "./auth.service.js" //gerar token

//3- CRIAR REGRAS DE FUNÇÕES COM BANCO DE DADOS

//antes de guardar no db, passa por 2 processos:
//1- validar email(se ja existe)
//2- criptografar a senha recebida
async function createUserService(newUser) {
    //antes de criar, ver se ja existe
    const foundUser = await userRepositories.findUserByEmailRepository(newUser.email) 
    if(foundUser) throw new Error("User alredy exists!") //se existir, erro.
    const passHash = await bcrypt.hash(newUser.password,10) //criptografando a senha do usuario

    //envia tudo para o db, mandando a versão criptografada da senha
    const user = await userRepositories.createUseerRepository({...newUser,password: passHash})

    if(!user) throw new Error("Error creating User");

    const token = generateJWT(user.id)
    return token;
}

async function findAllUserService() {
    const users = await userRepositories.findAllUserRepository()
    return users
}

async function findUserById(id) {
    const user = await userRepositories.findUserByIDRepository(id)
    if (!user) throw new Error("User not found")
    return user
}

async function updateUserRepository(userId, newUser) {
    const user = await userRepositories.findUserByiDRepository(userId)
    if (!user) throw new Error('User not found')
    if (newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password,10)
    }
    const userUpdated = userRepositories.updateUserRepository(userId, newUser)
    return userUpdated
}

async function deleteUserService(id) {
    const user = await userRepositories.findUserByIDRepository(id)
    if(!user) throw new Error ("User not found");
    
    const result = await userRepositories.deleteUserRepository(id)
    return result.message;
}

export default {
    createUserService,
    findAllUserService,
    findUserById,
    updateUserRepository,
    deleteUserService
}