//COMPARAÇÃO O TOKEN RECEBIDO NO HEADER,  COM O TOKEN EXISTENTE
import "dotenv/config" //usar variaveis do env
import jwt from "jsonwebtoken" //codifica os dados 
import userServices from "../service/user.services.js";


export function authMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization; // pegamos o token do header
    if(!tokenHeader) {//sem token, erro.
        return res.status(401).send({message: "O token não foi informado"});
    }

    const partsToken = tokenHeader.split(" "); //separar as palavras com espaço
    if (partsToken.length !==2) { // se o token n tiver 2 partes (berear + token)
        return res.status(401).send({message: "token invalido!"});
    }
    const [schema, token] = partsToken; //pega o bearear e token e guarda na var

    if(!/^Bearer$/i.test(schema)) { //se nao tiver a palavra "Bearer", erro
        return res.status(401).send({message: "token mal formado!"});
    }

    //verifica se o token enviado está no banco de dado dos tokens
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
        if(err) {
            return res.status(401).send({message: "token invalido!"});
        }

        const user = await userServices.findUserById(decoded.id) //id do token enviado
        if(!user || !user.id){
            return res.status(401).send({message: "token invalido!"});
        }

        req.userId = user.id
        return next()
    }); 
}

