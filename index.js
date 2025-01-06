import express from "express"; //biblioteca para criar servidores e API web em Node.js
import userRouters from "./src/routes/user.routes.js";
import bookRouters from "./src/routes/book.routes.js";
import loanRouters from "./src/routes/loan.routes.js"
import "./src/service/cron.service.js"

//CONFIGURA O SERVIDOR

const app = express(); //mesma coisa de colocar express().get etc
const port = process.env.PORT || 3000;  //Variavel ambiente que guarda numero da porta ex: 3000


app.use(express.json()); //troca automaticamente o tipo do arquivo
app.use(userRouters);
app.use(bookRouters);
app.use(loanRouters)

app.listen(port, ()=> {   //Inicia o servidor na porta 3000
console.log(`servidor rodando na porta ${port}`);
});


