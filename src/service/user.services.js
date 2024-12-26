import userRepositories from "../repositories/user.repositories.js";
import bcrypt from 'bcrypt' //biblioteca para criptografar dados do usuario

//3-USA FUNÇÕES QUE INTERAGEM COM BANCO DE DADOS PARA CRIAR REGRAS

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

    if(!user) throw new Error("Error creating User")
    return user;
}

export default {
    createUserService
}