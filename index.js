import express from "express"; //biblioteca para criar servidores e API web em Node.js
import userRouters from "./src/routes/user.routes.js";
//CONFIGURA O SERVIDOR

const app = express(); //mesma coisa de colocar express().get etc
app.use(express.json()); //troca automaticamente o tipo do arquivo

app.use(userRouters)

app.listen(3000, ()=> {   //Inicia o servidor na porta 3000
    console.log('servidor rodando na porta 3000');
});


